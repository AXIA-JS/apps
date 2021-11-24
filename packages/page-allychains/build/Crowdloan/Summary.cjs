"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Summary(_ref) {
  let {
    activeCap,
    activeRaised,
    className,
    fundCount,
    totalCap,
    totalRaised
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.SummaryBox, {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
      label: t('funds'),
      children: (0, _util.formatNumber)(fundCount)
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.CardSummary, {
      label: `${t('active raised / cap')}`,
      progress: {
        hideValue: true,
        total: activeCap,
        value: activeRaised
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: activeRaised,
        withCurrency: false,
        withSi: true
      }), "\xA0/\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: activeCap,
        withSi: true
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.CardSummary, {
      label: `${t('total raised / cap')}`,
      progress: {
        hideValue: true,
        total: totalCap,
        value: totalRaised
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: totalRaised,
        withCurrency: false,
        withSi: true
      }), "\xA0/\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: totalCap,
        withSi: true
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Summary);

exports.default = _default;