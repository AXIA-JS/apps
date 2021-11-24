// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useMemo, useRef, useState } from 'react';
import { Table } from '@axia-js/react-components';
import { useApi, useCall, useLoadingDelay, useSavedFlags } from '@axia-js/react-hooks';
import { BlockAuthorsContext } from '@axia-js/react-query';
import Filtering from "../Filtering.js";
import Legend from "../Legend.js";
import { useTranslation } from "../translate.js";
import useNominations from "../useNominations.js";
import Address from "./Address/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EmptyAuthorsContext = /*#__PURE__*/React.createContext({
  byAuthor: {},
  eraPoints: {},
  lastBlockAuthors: [],
  lastHeaders: []
});

function filterAccounts(accounts = [], elected, favorites, without) {
  return accounts.filter(accountId => !without.includes(accountId)).map(accountId => [accountId, elected.includes(accountId), favorites.includes(accountId)]).sort(([,, isFavA], [,, isFavB]) => isFavA === isFavB ? 0 : isFavA ? -1 : 1);
}

function accountsToString(accounts) {
  return accounts.map(a => a.toString());
}

function getFiltered(stakingOverview, favorites, next) {
  const allElected = accountsToString(stakingOverview.nextElected);
  const validatorIds = accountsToString(stakingOverview.validators);
  return {
    validators: filterAccounts(validatorIds, allElected, favorites, []),
    waiting: filterAccounts(allElected, allElected, favorites, validatorIds).concat(filterAccounts(next, [], favorites, allElected))
  };
}

const DEFAULT_PARAS = {};

function CurrentList({
  favorites,
  hasQueries,
  isIntentions,
  paraValidators = DEFAULT_PARAS,
  stakingOverview,
  targets,
  toggleFavorite
}) {
  var _api$derive$imOnline, _ref;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    byAuthor,
    eraPoints
  } = useContext(isIntentions ? EmptyAuthorsContext : BlockAuthorsContext);
  const recentlyOnline = useCall(!isIntentions && ((_api$derive$imOnline = api.derive.imOnline) === null || _api$derive$imOnline === void 0 ? void 0 : _api$derive$imOnline.receivedHeartbeats));
  const nominatedBy = useNominations(isIntentions);
  const [nameFilter, setNameFilter] = useState('');
  const [toggles, setToggle] = useSavedFlags('staking:overview', {
    withIdentity: false
  }); // we have a very large list, so we use a loading delay

  const isLoading = useLoadingDelay();
  const {
    validators,
    waiting
  } = useMemo(() => stakingOverview ? getFiltered(stakingOverview, favorites, targets.waitingIds) : {}, [favorites, stakingOverview, targets]);
  const infoMap = useMemo(() => {
    var _targets$validators;

    return (_targets$validators = targets.validators) === null || _targets$validators === void 0 ? void 0 : _targets$validators.reduce((result, info) => {
      result[info.key] = info;
      return result;
    }, {});
  }, [targets]);
  const headerRef = useRef(isIntentions ? [[t('intentions'), 'start', 2], [t('nominators'), 'expand'], [t('commission'), 'number'], [], []] : [[t('validators'), 'start', 2], [t('other stake'), 'expand'], [t('own stake'), 'media--1100'], [t('commission')], [t('points')], [t('last #')], [], [undefined, 'media--1200']]);
  return /*#__PURE__*/_jsx(Table, {
    empty: !isLoading && (isIntentions ? waiting && nominatedBy && t('No waiting validators found') : recentlyOnline && validators && infoMap && t('No active validators found')),
    emptySpinner: /*#__PURE__*/_jsxs(_Fragment, {
      children: [!waiting && /*#__PURE__*/_jsx("div", {
        children: t('Retrieving validators')
      }), !infoMap && /*#__PURE__*/_jsx("div", {
        children: t('Retrieving validator info')
      }), isIntentions ? !nominatedBy && /*#__PURE__*/_jsx("div", {
        children: t('Retrieving nominators')
      }) : !recentlyOnline && /*#__PURE__*/_jsx("div", {
        children: t('Retrieving online status')
      })]
    }),
    filter: /*#__PURE__*/_jsx(Filtering, {
      nameFilter: nameFilter,
      setNameFilter: setNameFilter,
      setWithIdentity: setToggle.withIdentity,
      withIdentity: toggles.withIdentity
    }),
    header: headerRef.current,
    legend: /*#__PURE__*/_jsx(Legend, {
      isRelay: !isIntentions && !!((_ref = api.query.parasShared || api.query.shared) !== null && _ref !== void 0 && _ref.activeValidatorIndices)
    }),
    children: !isLoading && ((isIntentions ? nominatedBy && waiting : validators) || []).map(([address, isElected, isFavorite]) => /*#__PURE__*/_jsx(Address, {
      address: address,
      filterName: nameFilter,
      hasQueries: hasQueries,
      isElected: isElected,
      isFavorite: isFavorite,
      isMain: !isIntentions,
      isPara: isIntentions ? false : paraValidators[address],
      lastBlock: byAuthor[address],
      nominatedBy: nominatedBy === null || nominatedBy === void 0 ? void 0 : nominatedBy[address],
      points: eraPoints[address],
      recentlyOnline: recentlyOnline === null || recentlyOnline === void 0 ? void 0 : recentlyOnline[address],
      toggleFavorite: toggleFavorite,
      validatorInfo: infoMap === null || infoMap === void 0 ? void 0 : infoMap[address],
      withIdentity: toggles.withIdentity
    }, address))
  });
}

export default /*#__PURE__*/React.memo(CurrentList);