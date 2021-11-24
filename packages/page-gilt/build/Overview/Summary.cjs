"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0
const DIVIDOR_NU = 10000;
const DIVISOR_BN = new _bn.default(10000);

function Summary(_ref) {
  let {
    activeTotal,
    className,
    isDisabled
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const bestNumber = (0, _reactHooks.useBestNumber)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.SummaryBox, {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('active'),
        children: isDisabled ? t('no') : t('yes')
      }), activeTotal && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('index'),
        children: (0, _util.formatNumber)(activeTotal.index)
      })]
    }), activeTotal && /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.CardSummary, {
        label: t('proportion'),
        children: [(activeTotal.proportion.mul(DIVISOR_BN).imul(_util.BN_HUNDRED).div(_util.BN_QUINTILL).toNumber() / DIVIDOR_NU).toFixed(2), "%"]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.CardSummary, {
        label: t('target'),
        children: [(activeTotal.target.mul(DIVISOR_BN).imul(_util.BN_HUNDRED).div(_util.BN_QUINTILL).toNumber() / DIVIDOR_NU).toFixed(2), "%"]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      children: bestNumber && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
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

var _default = /*#__PURE__*/_react.default.memo(Summary);

exports.default = _default;