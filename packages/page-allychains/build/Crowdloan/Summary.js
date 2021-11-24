// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { FormatBalance } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Summary({
  activeCap,
  activeRaised,
  className,
  fundCount,
  totalCap,
  totalRaised
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsxs(SummaryBox, {
    className: className,
    children: [/*#__PURE__*/_jsx(CardSummary, {
      label: t('funds'),
      children: formatNumber(fundCount)
    }), /*#__PURE__*/_jsxs(CardSummary, {
      label: `${t('active raised / cap')}`,
      progress: {
        hideValue: true,
        total: activeCap,
        value: activeRaised
      },
      children: [/*#__PURE__*/_jsx(FormatBalance, {
        value: activeRaised,
        withCurrency: false,
        withSi: true
      }), "\xA0/\xA0", /*#__PURE__*/_jsx(FormatBalance, {
        value: activeCap,
        withSi: true
      })]
    }), /*#__PURE__*/_jsxs(CardSummary, {
      label: `${t('total raised / cap')}`,
      progress: {
        hideValue: true,
        total: totalCap,
        value: totalRaised
      },
      children: [/*#__PURE__*/_jsx(FormatBalance, {
        value: totalRaised,
        withCurrency: false,
        withSi: true
      }), "\xA0/\xA0", /*#__PURE__*/_jsx(FormatBalance, {
        value: totalCap,
        withSi: true
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Summary);