// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { useApi, useBestNumber, useCall, useTreasury } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Summary({
  approvalCount,
  proposalCount
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const bestNumber = useBestNumber();
  const totalProposals = useCall(api.query.treasury.proposalCount);
  const {
    burn,
    spendPeriod,
    value
  } = useTreasury();
  return /*#__PURE__*/_jsxs(SummaryBox, {
    children: [/*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx(CardSummary, {
        label: t('proposals'),
        children: formatNumber(proposalCount)
      }), /*#__PURE__*/_jsx(CardSummary, {
        label: t('total'),
        children: formatNumber(totalProposals || 0)
      })]
    }), /*#__PURE__*/_jsx("section", {
      className: "media--1200",
      children: /*#__PURE__*/_jsx(CardSummary, {
        label: t('approved'),
        children: formatNumber(approvalCount)
      })
    }), /*#__PURE__*/_jsxs("section", {
      children: [value && /*#__PURE__*/_jsx(CardSummary, {
        label: t('available'),
        children: /*#__PURE__*/_jsx(FormatBalance, {
          value: value,
          withSi: true
        })
      }), burn && /*#__PURE__*/_jsx(CardSummary, {
        className: "media--1000",
        label: t('next burn'),
        children: /*#__PURE__*/_jsx(FormatBalance, {
          value: burn,
          withSi: true
        })
      })]
    }), bestNumber && (spendPeriod === null || spendPeriod === void 0 ? void 0 : spendPeriod.gtn(0)) && /*#__PURE__*/_jsx("section", {
      children: /*#__PURE__*/_jsx(CardSummary, {
        label: t('spend period'),
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