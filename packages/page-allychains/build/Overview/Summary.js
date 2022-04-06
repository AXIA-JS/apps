// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import SummarySession from '@axia-js/app-explorer/SummarySession';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { BestFinalized } from '@axia-js/react-query';
import { formatNumber, isNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Summary({
  leasePeriod,
  allychainCount,
  proposalCount,
  upcomingCount
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsxs(SummaryBox, {
    children: [/*#__PURE__*/_jsxs("section", {
      children: [isNumber(allychainCount) && /*#__PURE__*/_jsx(CardSummary, {
        label: t('allychains'),
        children: formatNumber(allychainCount)
      }), isNumber(upcomingCount) && /*#__PURE__*/_jsx(CardSummary, {
        className: "media--1000",
        label: t('allythreads'),
        children: formatNumber(upcomingCount)
      }), isNumber(proposalCount) && /*#__PURE__*/_jsx(CardSummary, {
        className: "media--1000",
        label: t('proposals'),
        children: formatNumber(proposalCount)
      })]
    }), /*#__PURE__*/_jsx("section", {
      children: leasePeriod && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(CardSummary, {
          label: t('current lease'),
          children: formatNumber(leasePeriod.currentPeriod)
        }), /*#__PURE__*/_jsx(CardSummary, {
          className: "media--1200",
          label: t('lease period'),
          progress: {
            total: leasePeriod.length,
            value: leasePeriod.progress,
            withTime: true
          }
        })]
      })
    }), /*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx(CardSummary, {
        label: t('finalized'),
        children: /*#__PURE__*/_jsx(BestFinalized, {})
      }), /*#__PURE__*/_jsx(SummarySession, {
        className: "media--1200",
        withEra: false
      })]
    })]
  });
}

export default Summary;