import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Icon, Table, Toggle } from '@axia-js/react-components';
import { useApi, useAvailableSlashes, useBlocksPerDays, useSavedFlags } from '@axia-js/react-hooks';
import { BN_HUNDRED } from '@axia-js/util';
import { MAX_NOMINATIONS } from "../constants.js";
import ElectionBanner from "../ElectionBanner.js";
import Filtering from "../Filtering.js";
import Legend from "../Legend.js";
import { useTranslation } from "../translate.js";
import useIdentities from "../useIdentities.js";
import useNominations from "../useNominations.js";
import Nominate from "./Nominate.js";
import Summary from "./Summary.js";
import useOwnNominators from "./useOwnNominators.js";
import Validator from "./Validator.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const CLASSES = {
  rankBondOther: 'media--1600',
  rankBondOwn: 'media--900'
};
const MAX_CAP_PERCENT = 100; // 75 if only using numNominators

const MAX_COMM_PERCENT = 20; // -1 for median

const MAX_DAYS = 7;
const SORT_KEYS = ['rankBondTotal', 'rankBondOwn', 'rankBondOther', 'rankOverall'];

function overlapsDisplay(displays, test) {
  return displays.some(d => d.length === test.length ? d.length === 1 ? d[0] === test[0] : d.reduce((c, p, i) => c + (p === test[i] ? 1 : 0), 0) >= test.length - 1 : false);
}

function applyFilter(validators, medianComm, allIdentity, {
  daysPayout,
  isBabe,
  maxPaid,
  withElected,
  withGroup,
  withIdentity,
  withPayout,
  withoutComm,
  withoutOver
}, nominatedBy) {
  const displays = [];
  const parentIds = [];
  return validators.filter(({
    accountId,
    commissionPer,
    isElected,
    isFavorite,
    lastPayout,
    numNominators
  }) => {
    var _nominatedBy$stashId;

    if (isFavorite) {
      return true;
    }

    const stashId = accountId.toString();
    const thisIdentity = allIdentity[stashId];
    const nomCount = numNominators || (nominatedBy === null || nominatedBy === void 0 ? void 0 : (_nominatedBy$stashId = nominatedBy[stashId]) === null || _nominatedBy$stashId === void 0 ? void 0 : _nominatedBy$stashId.length) || 0;

    if ((!withElected || isElected) && (!withIdentity || !!(thisIdentity !== null && thisIdentity !== void 0 && thisIdentity.hasIdentity)) && (!withPayout || !isBabe || !!lastPayout && daysPayout.gte(lastPayout)) && (!withoutComm || (MAX_COMM_PERCENT > 0 ? commissionPer < MAX_COMM_PERCENT : !medianComm || commissionPer <= medianComm)) && (!withoutOver || !maxPaid || maxPaid.muln(MAX_CAP_PERCENT).div(BN_HUNDRED).gten(nomCount))) {
      if (!withGroup) {
        return true;
      } else if (!thisIdentity || !thisIdentity.hasIdentity) {
        parentIds.push(stashId);
        return true;
      } else if (!thisIdentity.parentId) {
        if (!parentIds.includes(stashId)) {
          if (thisIdentity.display) {
            const sanitized = thisIdentity.display.replace(/[^\x20-\x7E]/g, '').replace(/-/g, ' ').replace(/_/g, ' ').split(' ').map(p => p.trim()).filter(v => !!v);

            if (overlapsDisplay(displays, sanitized)) {
              return false;
            }

            displays.push(sanitized);
          }

          parentIds.push(stashId);
          return true;
        }
      } else if (!parentIds.includes(thisIdentity.parentId)) {
        parentIds.push(thisIdentity.parentId);
        return true;
      }
    }

    return false;
  });
}

function sort(sortBy, sortFromMax, validators) {
  return validators.sort((a, b) => sortFromMax ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]).sort((a, b) => a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1);
}

function extractNominees(ownNominators = []) {
  const myNominees = [];
  ownNominators.forEach(({
    nominating = []
  }) => {
    nominating.forEach(nominee => {
      !myNominees.includes(nominee) && myNominees.push(nominee);
    });
  });
  return myNominees;
}

function selectProfitable(list, maxNominations) {
  const result = [];

  for (let i = 0; i < list.length && result.length < maxNominations; i++) {
    const {
      isBlocking,
      isFavorite,
      key,
      stakedReturnCmp
    } = list[i];
    !isBlocking && (isFavorite || stakedReturnCmp > 0) && result.push(key);
  }

  return result;
}

const DEFAULT_FLAGS = {
  withElected: false,
  withGroup: true,
  withIdentity: false,
  withPayout: false,
  withoutComm: true,
  withoutOver: true
};
const DEFAULT_NAME = {
  isQueryFiltered: false,
  nameFilter: ''
};
const DEFAULT_SORT = {
  sortBy: 'rankOverall',
  sortFromMax: true
};

function Targets({
  className = '',
  isInElection,
  ownStashes,
  targets: {
    avgStaked,
    inflation: {
      stakedReturn
    },
    lowStaked,
    medianComm,
    minNominated,
    minNominatorBond,
    nominators,
    totalIssuance,
    totalStaked,
    validatorIds,
    validators
  },
  toggleFavorite,
  toggleLedger
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const allSlashes = useAvailableSlashes();
  const daysPayout = useBlocksPerDays(MAX_DAYS);
  const ownNominators = useOwnNominators(ownStashes);
  const nominatedBy = useNominations(true);
  const allIdentity = useIdentities(validatorIds);
  const [selected, setSelected] = useState([]);
  const [{
    isQueryFiltered,
    nameFilter
  }, setNameFilter] = useState(DEFAULT_NAME);
  const [toggles, setToggle] = useSavedFlags('staking:targets', DEFAULT_FLAGS);
  const [{
    sortBy,
    sortFromMax
  }, setSortBy] = useState(DEFAULT_SORT);
  const [sorted, setSorted] = useState();
  const labelsRef = useRef({
    rankBondOther: t('other stake'),
    rankBondOwn: t('own stake'),
    rankBondTotal: t('total stake'),
    rankOverall: t('return')
  });
  const flags = useMemo(() => {
    var _api$consts$staking;

    return _objectSpread(_objectSpread({}, toggles), {}, {
      daysPayout,
      isBabe: !!api.consts.babe,
      isQueryFiltered,
      maxPaid: (_api$consts$staking = api.consts.staking) === null || _api$consts$staking === void 0 ? void 0 : _api$consts$staking.maxNominatorRewardedPerValidator
    });
  }, [api, daysPayout, isQueryFiltered, toggles]);
  const filtered = useMemo(() => allIdentity && validators && nominatedBy && applyFilter(validators, medianComm, allIdentity, flags, nominatedBy), [allIdentity, flags, medianComm, nominatedBy, validators]); // We are using an effect here to get this async. Sorting will have a double-render, however it allows
  // the page to immediately display (with loading), whereas useMemo would have a laggy interface
  // (the same applies for changing the sort order, state here is more effective)

  useEffect(() => {
    filtered && setSorted(sort(sortBy, sortFromMax, filtered));
  }, [filtered, sortBy, sortFromMax]);
  useEffect(() => {
    toggleLedger();
  }, [toggleLedger]);
  const myNominees = useMemo(() => extractNominees(ownNominators), [ownNominators]);

  const _sort = useCallback(sortBy => setSortBy(p => ({
    sortBy,
    sortFromMax: sortBy === p.sortBy ? !p.sortFromMax : true
  })), []);

  const _toggleSelected = useCallback(address => setSelected(selected.includes(address) ? selected.filter(a => address !== a) : [...selected, address]), [selected]);

  const _selectProfitable = useCallback(() => filtered && setSelected(selectProfitable(filtered, api.consts.staking.maxNominations ? api.consts.staking.maxNominations.toNumber() : MAX_NOMINATIONS)), [api, filtered]);

  const _setNameFilter = useCallback((nameFilter, isQueryFiltered) => setNameFilter({
    isQueryFiltered,
    nameFilter
  }), []);

  const header = useMemo(() => [[t('validators'), 'start', 3], [t('payout'), 'media--1400'], [t('nominators'), 'media--1200', 2], [t('comm.'), 'media--1100'], ...SORT_KEYS.map(header => [/*#__PURE__*/_jsxs(_Fragment, {
    children: [labelsRef.current[header], /*#__PURE__*/_jsx(Icon, {
      icon: sortBy === header ? sortFromMax ? 'chevron-down' : 'chevron-up' : 'minus'
    })]
  }), `${sorted ? `isClickable ${sortBy === header ? 'highlight--border' : ''} number` : 'number'} ${CLASSES[header] || ''}`, 1, () => _sort(header)]), [], []], [_sort, labelsRef, sortBy, sorted, sortFromMax, t]);
  const filter = useMemo(() => /*#__PURE__*/_jsx("div", {
    children: /*#__PURE__*/_jsxs(Filtering, {
      nameFilter: nameFilter,
      setNameFilter: _setNameFilter,
      setWithIdentity: setToggle.withIdentity,
      withIdentity: toggles.withIdentity,
      children: [/*#__PURE__*/_jsx(Toggle, {
        className: "staking--buttonToggle",
        label: t('single from operator'),
        onChange: setToggle.withGroup,
        value: toggles.withGroup
      }), /*#__PURE__*/_jsx(Toggle, {
        className: "staking--buttonToggle",
        label: MAX_COMM_PERCENT > 0 ? t('no {{maxComm}}%+ comm', {
          replace: {
            maxComm: MAX_COMM_PERCENT
          }
        }) : t('no median+ comm'),
        onChange: setToggle.withoutComm,
        value: toggles.withoutComm
      }), /*#__PURE__*/_jsx(Toggle, {
        className: "staking--buttonToggle",
        label: MAX_CAP_PERCENT < 100 ? t('no {{maxCap}}%+ capacity', {
          replace: {
            maxCap: MAX_CAP_PERCENT
          }
        }) : t('no at capacity'),
        onChange: setToggle.withoutOver,
        value: toggles.withoutOver
      }), api.consts.babe &&
      /*#__PURE__*/
      // FIXME have some sane era defaults for Aura
      _jsx(Toggle, {
        className: "staking--buttonToggle",
        label: t('recent payouts'),
        onChange: setToggle.withPayout,
        value: toggles.withPayout
      }), /*#__PURE__*/_jsx(Toggle, {
        className: "staking--buttonToggle",
        label: t('only elected'),
        onChange: setToggle.withElected,
        value: toggles.withElected
      })]
    })
  }), [api, nameFilter, _setNameFilter, setToggle, t, toggles]);
  const displayList = isQueryFiltered ? validators : sorted;
  const maxNominations = api.consts.staking.maxNominations ? api.consts.staking.maxNominations.toNumber() : MAX_NOMINATIONS;
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Summary, {
      avgStaked: avgStaked,
      lowStaked: lowStaked,
      minNominated: minNominated,
      minNominatorBond: minNominatorBond,
      numNominators: nominators === null || nominators === void 0 ? void 0 : nominators.length,
      numValidators: validators === null || validators === void 0 ? void 0 : validators.length,
      stakedReturn: stakedReturn,
      totalIssuance: totalIssuance,
      totalStaked: totalStaked
    }), /*#__PURE__*/_jsxs(Button.Group, {
      children: [/*#__PURE__*/_jsx(Button, {
        icon: "check",
        isDisabled: !(validators !== null && validators !== void 0 && validators.length) || !(ownNominators !== null && ownNominators !== void 0 && ownNominators.length),
        label: t('Most profitable'),
        onClick: _selectProfitable
      }), /*#__PURE__*/_jsx(Nominate, {
        isDisabled: isInElection || !(validators !== null && validators !== void 0 && validators.length),
        ownNominators: ownNominators,
        targets: selected
      })]
    }), /*#__PURE__*/_jsx(ElectionBanner, {
      isInElection: isInElection
    }), /*#__PURE__*/_jsx(Table, {
      empty: sorted && t('No active validators to check'),
      emptySpinner: /*#__PURE__*/_jsxs(_Fragment, {
        children: [!(validators && allIdentity) && /*#__PURE__*/_jsx("div", {
          children: t('Retrieving validators')
        }), !nominatedBy && /*#__PURE__*/_jsx("div", {
          children: t('Retrieving nominators')
        })]
      }),
      filter: filter,
      header: header,
      legend: /*#__PURE__*/_jsx(Legend, {}),
      children: displayList === null || displayList === void 0 ? void 0 : displayList.map(info => /*#__PURE__*/_jsx(Validator, {
        allSlashes: allSlashes,
        canSelect: selected.length < maxNominations,
        filterName: nameFilter,
        info: info,
        isNominated: myNominees.includes(info.key),
        isSelected: selected.includes(info.key),
        nominatedBy: nominatedBy === null || nominatedBy === void 0 ? void 0 : nominatedBy[info.key],
        toggleFavorite: toggleFavorite,
        toggleSelected: _toggleSelected
      }, info.key))
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Targets).withConfig({
  displayName: "Targets",
  componentId: "sc-19x5wb3-0"
})(["text-align:center;th.isClickable{.ui--Icon{margin-left:0.5rem;}}.ui--Table{overflow-x:auto;}"]));