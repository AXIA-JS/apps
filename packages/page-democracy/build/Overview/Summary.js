// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { useApi, useBestNumber, useCall, useCallMulti } from '@axia-js/react-hooks';
import { BN_ONE, formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const optMulti = {
  defaultValue: [undefined, undefined]
};

function Summary({
  referendumCount
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const activeProposals = useCall(api.derive.democracy.proposals);
  const bestNumber = useBestNumber();
  const [publicPropCount, referendumTotal] = useCallMulti([api.query.democracy.publicPropCount, api.query.democracy.referendumCount], optMulti);
  return /*#__PURE__*/_jsxs(SummaryBox, {
    children: [/*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx(CardSummary, {
        label: t('proposals'),
        children: formatNumber(activeProposals === null || activeProposals === void 0 ? void 0 : activeProposals.length)
      }), /*#__PURE__*/_jsx(CardSummary, {
        label: t('total'),
        children: formatNumber(publicPropCount)
      })]
    }), /*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx(CardSummary, {
        label: t('referenda'),
        children: formatNumber(referendumCount || 0)
      }), /*#__PURE__*/_jsx(CardSummary, {
        label: t('total'),
        children: formatNumber(referendumTotal || 0)
      })]
    }), bestNumber && /*#__PURE__*/_jsx("section", {
      className: "media--1100",
      children: /*#__PURE__*/_jsx(CardSummary, {
        label: t('launch period'),
        progress: {
          total: api.consts.democracy.launchPeriod,
          value: bestNumber.mod(api.consts.democracy.launchPeriod).iadd(BN_ONE),
          withTime: true
        }
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Summary);