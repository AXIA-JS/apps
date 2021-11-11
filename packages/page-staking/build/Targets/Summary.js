// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import { BN_ONE, BN_ZERO } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const transformReward = {
  transform: optBalance => optBalance.unwrapOrDefault()
};
const transformEra = {
  transform: ({
    activeEra
  }) => activeEra.gt(BN_ZERO) ? activeEra.sub(BN_ONE) : undefined
};

function Summary({
  avgStaked,
  lowStaked,
  minNominated,
  minNominatorBond,
  stakedReturn,
  totalIssuance,
  totalStaked
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const lastEra = useCall(api.derive.session.indexes, undefined, transformEra);
  const lastReward = useCall(lastEra && api.query.staking.erasValidatorReward, [lastEra], transformReward);
  const progressStake = useMemo(() => totalIssuance && totalStaked && totalStaked.gtn(0) ? {
    hideValue: true,
    total: totalIssuance,
    value: totalStaked
  } : undefined, [totalIssuance, totalStaked]);
  const progressAvg = useMemo(() => avgStaked && lowStaked && avgStaked.gtn(0) ? {
    hideValue: true,
    total: avgStaked,
    value: lowStaked
  } : undefined, [avgStaked, lowStaked]);
  return /*#__PURE__*/_jsxs(SummaryBox, {
    children: [/*#__PURE__*/_jsx("section", {
      className: "media--800",
      children: totalIssuance && (totalStaked === null || totalStaked === void 0 ? void 0 : totalStaked.gt(BN_ZERO)) && /*#__PURE__*/_jsx(CardSummary, {
        label: t('total staked'),
        progress: progressStake,
        children: /*#__PURE__*/_jsx(FormatBalance, {
          value: totalStaked,
          withSi: true
        })
      })
    }), /*#__PURE__*/_jsx("section", {
      className: "media--800",
      children: totalIssuance && stakedReturn > 0 && Number.isFinite(stakedReturn) && /*#__PURE__*/_jsxs(CardSummary, {
        label: t('returns'),
        children: [stakedReturn.toFixed(1), "%"]
      })
    }), /*#__PURE__*/_jsx("section", {
      className: "media--1000",
      children: (avgStaked === null || avgStaked === void 0 ? void 0 : avgStaked.gtn(0)) && (lowStaked === null || lowStaked === void 0 ? void 0 : lowStaked.gtn(0)) && /*#__PURE__*/_jsxs(CardSummary, {
        label: `${t('lowest / avg staked')}`,
        progress: progressAvg,
        children: [/*#__PURE__*/_jsx(FormatBalance, {
          value: lowStaked,
          withCurrency: false,
          withSi: true
        }), "\xA0/\xA0", /*#__PURE__*/_jsx(FormatBalance, {
          value: avgStaked,
          withSi: true
        })]
      })
    }), /*#__PURE__*/_jsx("section", {
      className: "media--1600",
      children: (minNominated === null || minNominated === void 0 ? void 0 : minNominated.gt(BN_ZERO)) && /*#__PURE__*/_jsxs(CardSummary, {
        className: "media--1600",
        label: minNominatorBond ? t('min nominated / threshold') : t('min nominated'),
        children: [/*#__PURE__*/_jsx(FormatBalance, {
          value: minNominated,
          withCurrency: !minNominatorBond,
          withSi: true
        }), minNominatorBond && /*#__PURE__*/_jsxs(_Fragment, {
          children: ["\xA0/\xA0", /*#__PURE__*/_jsx(FormatBalance, {
            value: minNominatorBond,
            withSi: true
          })]
        })]
      })
    }), /*#__PURE__*/_jsx("section", {
      children: (lastReward === null || lastReward === void 0 ? void 0 : lastReward.gtn(0)) && /*#__PURE__*/_jsx(CardSummary, {
        label: t('last reward'),
        children: /*#__PURE__*/_jsx(FormatBalance, {
          value: lastReward,
          withSi: true
        })
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Summary);