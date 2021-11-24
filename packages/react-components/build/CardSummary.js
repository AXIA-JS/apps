import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { BlockToTime } from '@axia-js/react-query';
import { BN_HUNDRED, formatNumber, isUndefined } from '@axia-js/util';
import Labelled from "./Labelled.js";
import Progress from "./Progress.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function CardSummary({
  children,
  className = '',
  help,
  label,
  progress
}) {
  const value = progress && progress.value;
  const total = progress && progress.total;
  const left = progress && !isUndefined(value) && !isUndefined(total) && value.gten(0) && total.gtn(0) ? value.gt(total) ? `>${progress.isPercent ? '100' : formatNumber(total)}` : progress.isPercent ? value.mul(BN_HUNDRED).div(total).toString() : formatNumber(value) : undefined;

  if (progress && isUndefined(left)) {
    return null;
  }

  const isTimed = progress && progress.withTime && !isUndefined(progress.total);
  const testidSuffix = (label !== null && label !== void 0 ? label : '').toString();
  return /*#__PURE__*/_jsxs("article", {
    className: className,
    "data-testid": `card-summary:${testidSuffix}`,
    children: [/*#__PURE__*/_jsxs(Labelled, {
      help: help,
      isSmall: true,
      label: label,
      children: [children, progress && !progress.hideValue && /*#__PURE__*/_jsxs(_Fragment, {
        children: [isTimed && !children && /*#__PURE__*/_jsx(BlockToTime, {
          value: progress.total
        }), /*#__PURE__*/_jsx("div", {
          className: isTimed ? 'isSecondary' : 'isPrimary',
          children: !left || isUndefined(progress.total) ? '-' : !isTimed || progress.isPercent || !progress.value ? `${left}${progress.isPercent ? '' : '/'}${progress.isPercent ? '%' : formatNumber(progress.total)}` : /*#__PURE__*/_jsx(BlockToTime, {
            className: "timer",
            value: progress.total.sub(progress.value)
          })
        })]
      })]
    }), progress && !progress.hideGraph && /*#__PURE__*/_jsx(Progress, _objectSpread({}, progress))]
  });
}

export default /*#__PURE__*/React.memo(styled(CardSummary).withConfig({
  displayName: "CardSummary",
  componentId: "sc-c1dznr-0"
})(["align-items:center;background:transparent !important;border:none !important;box-shadow:none !important;color:var(--color-summary);display:flex;flex:0 1 auto;flex-flow:row wrap;justify-content:flex-end;padding:0 1.5rem;.ui--FormatBalance .balance-postfix{opacity:1;}.ui--Progress{margin:0.5rem 0.125rem 0.125rem 0.75rem;}> .ui--Labelled{font-size:1.75rem;font-weight:var(--font-weight-light);position:relative;line-height:1;text-align:right;> *{margin:0.25rem 0;&:first-child{margin-top:0;}&:last-child{margin-bottom:0;}}> label{font-size:0.95rem;}.isSecondary{font-size:1rem;font-weight:var(--font-weight-normal);.timer{min-width:8rem;}}}@media(max-width:767px){min-height:4.8rem;padding:0.25 0.4em;> div{font-size:1.4rem;}}"]));