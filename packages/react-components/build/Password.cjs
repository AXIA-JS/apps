"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Input = _interopRequireDefault(require("./Input.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Password(_ref) {
  let {
    autoFocus,
    children,
    className = '',
    defaultValue,
    help,
    isDisabled,
    isError,
    isFull,
    label,
    labelExtra,
    name,
    onChange,
    onEnter,
    onEscape,
    tabIndex,
    value,
    withLabel
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Input.default, {
    autoFocus: autoFocus,
    className: `ui--Password ${className}`,
    defaultValue: defaultValue,
    help: help,
    isDisabled: isDisabled,
    isError: isError,
    isFull: isFull,
    label: label,
    labelExtra: labelExtra,
    name: name,
    onChange: onChange,
    onEnter: onEnter,
    onEscape: onEscape,
    tabIndex: tabIndex,
    type: "password",
    value: value,
    withLabel: withLabel,
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo(Password);

exports.default = _default;