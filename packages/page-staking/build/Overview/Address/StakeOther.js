// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useMemo } from 'react';
import { AddressMini, Expander } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import { BN_ZERO } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function extractFunction(all) {
  return all.length ? [all.length, () => all.map(({
    nominatorId,
    value
  }) => /*#__PURE__*/_jsx(AddressMini, {
    bonded: value,
    value: nominatorId,
    withBonded: true
  }, nominatorId))] : null;
}

function extractTotals(maxPaid, nominators, stakeOther) {
  const sorted = nominators.sort((a, b) => b.value.cmp(a.value));

  if (!maxPaid || maxPaid.gtn(sorted.length)) {
    return [extractFunction(sorted), stakeOther || BN_ZERO, null, BN_ZERO];
  }

  const max = maxPaid.toNumber();
  const rewarded = sorted.slice(0, max);
  const rewardedTotal = rewarded.reduce((total, {
    value
  }) => total.iadd(value), new BN(0));
  const unrewarded = sorted.slice(max);
  const unrewardedTotal = unrewarded.reduce((total, {
    value
  }) => total.iadd(value), new BN(0));
  return [extractFunction(rewarded), rewardedTotal, extractFunction(unrewarded), unrewardedTotal];
}

function StakeOther({
  nominators,
  stakeOther
}) {
  const {
    api
  } = useApi();
  const [rewarded, rewardedTotal, unrewarded, unrewardedTotal] = useMemo(() => {
    var _api$consts$staking;

    return extractTotals((_api$consts$staking = api.consts.staking) === null || _api$consts$staking === void 0 ? void 0 : _api$consts$staking.maxNominatorRewardedPerValidator, nominators, stakeOther);
  }, [api, nominators, stakeOther]);
  return /*#__PURE__*/_jsx("td", {
    className: "expand all",
    children: rewarded && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Expander, {
        renderChildren: rewarded[1],
        summary: /*#__PURE__*/_jsx(FormatBalance, {
          labelPost: ` (${rewarded[0]})`,
          value: rewardedTotal
        })
      }), unrewarded && /*#__PURE__*/_jsx(Expander, {
        className: "stakeOver",
        renderChildren: unrewarded[1],
        summary: /*#__PURE__*/_jsx(FormatBalance, {
          labelPost: ` (${unrewarded[0]})`,
          value: unrewardedTotal
        })
      })]
    })
  });
}

export default /*#__PURE__*/React.memo(StakeOther);