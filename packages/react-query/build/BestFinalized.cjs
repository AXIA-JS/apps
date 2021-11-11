"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
function BestFinalized({
  children,
  className = '',
  label
}) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const bestNumberFinalized = (0, _reactHooks.useCall)(api.derive.chain.bestNumberFinalized);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [label || '', bestNumberFinalized ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Digits, {
      value: (0, _util.formatNumber)(bestNumberFinalized)
    }) : '-', children]
  });
}

var _default = /*#__PURE__*/_react.default.memo(BestFinalized);

exports.default = _default;