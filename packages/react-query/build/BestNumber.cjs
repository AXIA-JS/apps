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
function BestNumber({
  children,
  className = '',
  isFinalized,
  label,
  withPound
}) {
  const {
    api,
    isApiReady
  } = (0, _reactHooks.useApi)();
  const bestNumber = (0, _reactHooks.useCall)(isApiReady && (isFinalized ? api.derive.chain.bestNumberFinalized : api.derive.chain.bestNumber));
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [label || '', withPound && '#', bestNumber ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Digits, {
      value: (0, _util.formatNumber)(bestNumber)
    }) : '-', children]
  });
}

var _default = /*#__PURE__*/_react.default.memo(BestNumber);

exports.default = _default;