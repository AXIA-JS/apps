// Copyright 2017-2021 @axia-js/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React from 'react';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { useApi, useBestNumber } from '@axia-js/react-hooks';
import { BN_HUNDRED, BN_QUINTILL, formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DIVIDOR_NU = 10000;
const DIVISOR_BN = new BN(10000);

function Summary({
  activeTotal,
  className,
  isDisabled
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const bestNumber = useBestNumber();
  return /*#__PURE__*/_jsxs(SummaryBox, {
    className: className,
    children: [/*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx(CardSummary, {
        label: t('active'),
        children: isDisabled ? t('no') : t('yes')
      }), activeTotal && /*#__PURE__*/_jsx(CardSummary, {
        label: t('index'),
        children: formatNumber(activeTotal.index)
      })]
    }), activeTotal && /*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsxs(CardSummary, {
        label: t('proportion'),
        children: [(activeTotal.proportion.mul(DIVISOR_BN).imul(BN_HUNDRED).div(BN_QUINTILL).toNumber() / DIVIDOR_NU).toFixed(2), "%"]
      }), /*#__PURE__*/_jsxs(CardSummary, {
        label: t('target'),
        children: [(activeTotal.target.mul(DIVISOR_BN).imul(BN_HUNDRED).div(BN_QUINTILL).toNumber() / DIVIDOR_NU).toFixed(2), "%"]
      })]
    }), /*#__PURE__*/_jsx("section", {
      children: bestNumber && /*#__PURE__*/_jsx(CardSummary, {
        label: t('intake'),
        progress: {
          total: api.consts.gilt.intakePeriod,
          value: bestNumber.mod(api.consts.gilt.intakePeriod),
          withTime: true
        }
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Summary);