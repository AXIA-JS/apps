// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo } from 'react';
import { AddressSmall, Badge, Checkbox, Icon } from '@axia-js/react-components';
import { checkVisibility } from '@axia-js/react-components/util';
import { useApi, useBlockTime, useCall } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import MaxBadge from "../MaxBadge.js";
import Favorite from "../Overview/Address/Favorite.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function queryAddress(address) {
  window.location.hash = `/staking/query/${address}`;
}

function Validator({
  allSlashes,
  canSelect,
  filterName,
  info,
  isNominated,
  isSelected,
  nominatedBy = [],
  toggleFavorite,
  toggleSelected
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const accountInfo = useCall(api.derive.accounts.info, [info.accountId]);
  const [,, time] = useBlockTime(info.lastPayout);
  const isVisible = useMemo(() => accountInfo ? checkVisibility(api, info.key, accountInfo, filterName) : true, [accountInfo, api, filterName, info]);
  const slashes = useMemo(() => (allSlashes || []).map(([era, all]) => ({
    era,
    slashes: all.filter(({
      validator
    }) => validator.eq(info.accountId))
  })).filter(({
    slashes
  }) => slashes.length), [allSlashes, info]);

  const _onQueryStats = useCallback(() => queryAddress(info.key), [info.key]);

  const _toggleSelected = useCallback(() => toggleSelected(info.key), [info.key, toggleSelected]);

  if (!isVisible) {
    return null;
  }

  const {
    accountId,
    bondOther,
    bondOwn,
    bondTotal,
    commissionPer,
    isBlocking,
    isElected,
    isFavorite,
    key,
    lastPayout,
    numNominators,
    rankOverall,
    stakedReturnCmp
  } = info;
  return /*#__PURE__*/_jsxs("tr", {
    children: [/*#__PURE__*/_jsxs("td", {
      className: "badge together",
      children: [/*#__PURE__*/_jsx(Favorite, {
        address: key,
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite
      }), isNominated ? /*#__PURE__*/_jsx(Badge, {
        color: "green",
        icon: "hand-paper"
      }) : /*#__PURE__*/_jsx(Badge, {
        color: "transparent"
      }), isElected ? /*#__PURE__*/_jsx(Badge, {
        color: "blue",
        icon: "chevron-right"
      }) : /*#__PURE__*/_jsx(Badge, {
        color: "transparent"
      }), /*#__PURE__*/_jsx(MaxBadge, {
        numNominators: numNominators || nominatedBy.length
      }), isBlocking && /*#__PURE__*/_jsx(Badge, {
        color: "red",
        icon: "user-slash"
      }), slashes.length !== 0 && /*#__PURE__*/_jsx(Badge, {
        color: "red",
        hover: t('Slashed in era {{eras}}', {
          replace: {
            eras: slashes.map(({
              era
            }) => formatNumber(era)).join(', ')
          }
        }),
        icon: "skull-crossbones"
      })]
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: formatNumber(rankOverall)
    }), /*#__PURE__*/_jsx("td", {
      className: "address all",
      children: /*#__PURE__*/_jsx(AddressSmall, {
        value: accountId
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number media--1400",
      children: lastPayout && (api.consts.babe ? time.days ? time.days === 1 ? t('yesterday') : t('{{days}} days', {
        replace: {
          days: time.days
        }
      }) : t('recently') : formatNumber(lastPayout))
    }), /*#__PURE__*/_jsx("td", {
      className: "number media--1200 no-pad-right",
      children: numNominators || ''
    }), /*#__PURE__*/_jsx("td", {
      className: "number media--1200 no-pad-left",
      children: nominatedBy.length || ''
    }), /*#__PURE__*/_jsxs("td", {
      className: "number media--1100",
      children: [commissionPer.toFixed(2), "%"]
    }), /*#__PURE__*/_jsx("td", {
      className: "number together",
      children: !bondTotal.isZero() && /*#__PURE__*/_jsx(FormatBalance, {
        value: bondTotal
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number together media--900",
      children: !bondOwn.isZero() && /*#__PURE__*/_jsx(FormatBalance, {
        value: bondOwn
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number together media--1600",
      children: !bondOther.isZero() && /*#__PURE__*/_jsx(FormatBalance, {
        value: bondOther
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number together",
      children: stakedReturnCmp > 0 && /*#__PURE__*/_jsxs(_Fragment, {
        children: [stakedReturnCmp.toFixed(2), "%"]
      })
    }), /*#__PURE__*/_jsx("td", {
      children: !isBlocking && (canSelect || isSelected) && /*#__PURE__*/_jsx(Checkbox, {
        onChange: _toggleSelected,
        value: isSelected
      })
    }), /*#__PURE__*/_jsx("td", {
      children: /*#__PURE__*/_jsx(Icon, {
        className: "staking--stats highlight--color",
        icon: "chart-line",
        onClick: _onQueryStats
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Validator);