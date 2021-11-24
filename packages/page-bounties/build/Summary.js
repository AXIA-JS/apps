// Copyright 2017-2020 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useMemo } from 'react';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { useTreasury } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import { useBounties } from "./hooks/index.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Summary({
  activeBounties,
  className = ''
}) {
  const {
    t
  } = useTranslation();
  const {
    bestNumber,
    bounties,
    bountyIndex
  } = useBounties();
  const {
    spendPeriod
  } = useTreasury();
  const totalValue = useMemo(() => (bounties || []).reduce((total, {
    bounty: {
      value
    }
  }) => total.iadd(value), new BN(0)), [bounties]);
  return /*#__PURE__*/_jsxs(SummaryBox, {
    className: `ui--BountySummary ${className}`,
    children: [/*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx(CardSummary, {
        label: t('active'),
        children: activeBounties
      }), activeBounties !== undefined && /*#__PURE__*/_jsx(CardSummary, {
        label: t('past'),
        children: bountyIndex === null || bountyIndex === void 0 ? void 0 : bountyIndex.subn(activeBounties).toString()
      })]
    }), /*#__PURE__*/_jsx("section", {
      children: /*#__PURE__*/_jsx(CardSummary, {
        label: t('active total'),
        children: /*#__PURE__*/_jsx(FormatBalance, {
          value: totalValue,
          withSi: true
        })
      })
    }), /*#__PURE__*/_jsx("section", {
      children: bestNumber && spendPeriod.gtn(0) && /*#__PURE__*/_jsx(CardSummary, {
        label: t('funding period'),
        progress: {
          total: spendPeriod,
          value: bestNumber.mod(spendPeriod),
          withTime: true
        }
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Summary);