// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { BestFinalized, BestNumber, BlockToTime, TimeNow, TotalIssuance } from '@axia-js/react-query';
import { BN_ONE, formatNumber } from '@axia-js/util';
import SummarySession from "./SummarySession.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Summary({
  eventCount
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  return /*#__PURE__*/_jsxs(SummaryBox, {
    children: [/*#__PURE__*/_jsxs("section", {
      children: [api.query.timestamp && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(CardSummary, {
          label: t('last block'),
          children: /*#__PURE__*/_jsx(TimeNow, {})
        }), /*#__PURE__*/_jsx(CardSummary, {
          className: "media--800",
          label: t('target'),
          children: /*#__PURE__*/_jsx(BlockToTime, {
            value: BN_ONE
          })
        })]
      }), api.query.balances && /*#__PURE__*/_jsx(CardSummary, {
        className: "media--800",
        label: t('total issuance'),
        children: /*#__PURE__*/_jsx(TotalIssuance, {})
      })]
    }), /*#__PURE__*/_jsx("section", {
      className: "media--1200",
      children: /*#__PURE__*/_jsx(SummarySession, {
        withEra: false
      })
    }), /*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx(CardSummary, {
        className: "media--1000",
        label: t('last events'),
        children: formatNumber(eventCount)
      }), api.query.grandpa && /*#__PURE__*/_jsx(CardSummary, {
        label: t('finalized'),
        children: /*#__PURE__*/_jsx(BestFinalized, {})
      }), /*#__PURE__*/_jsx(CardSummary, {
        label: t('best'),
        children: /*#__PURE__*/_jsx(BestNumber, {})
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Summary);