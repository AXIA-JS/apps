"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _ChartPoints = _interopRequireDefault(require("./ChartPoints.cjs"));

var _ChartPrefs = _interopRequireDefault(require("./ChartPrefs.cjs"));

var _ChartRewards = _interopRequireDefault(require("./ChartRewards.cjs"));

var _ChartStake = _interopRequireDefault(require("./ChartStake.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Validator({
  className = '',
  validatorId
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Columar, {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Columar.Column, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartPoints.default, {
        validatorId: validatorId
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartRewards.default, {
        validatorId: validatorId
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Columar.Column, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartStake.default, {
        validatorId: validatorId
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartPrefs.default, {
        validatorId: validatorId
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Validator).withConfig({
  displayName: "Validator",
  componentId: "sc-f71cuz-0"
})([".staking--Chart{background:var(--bg-table);border:1px solid var(--border-table);border-radius:0.25rem;padding:1rem 1.5rem;}"]));

exports.default = _default;