"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _BaseBytes = _interopRequireDefault(require("./BaseBytes.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Hash512({
  className = '',
  defaultValue,
  isDisabled,
  isError,
  label,
  name,
  onChange,
  onEnter,
  onEscape,
  type,
  withLabel
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_BaseBytes.default, {
    asHex: true,
    className: className,
    defaultValue: defaultValue,
    isDisabled: isDisabled,
    isError: isError,
    label: label,
    length: 64,
    name: name,
    onChange: onChange,
    onEnter: onEnter,
    onEscape: onEscape,
    type: type,
    withCopy: isDisabled,
    withLabel: withLabel
  });
}

var _default = /*#__PURE__*/_react.default.memo(Hash512);

exports.default = _default;