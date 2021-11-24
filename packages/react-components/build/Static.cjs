"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _CopyButton = _interopRequireDefault(require("./CopyButton.cjs"));

var _Labelled = _interopRequireDefault(require("./Labelled.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Static(_ref) {
  let {
    children,
    className = '',
    defaultValue,
    help,
    isFull,
    isHidden,
    isSmall,
    label,
    value,
    withCopy,
    withLabel
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Labelled.default, {
    className: className,
    help: help,
    isFull: isFull,
    isHidden: isHidden,
    isSmall: isSmall,
    label: label,
    withLabel: withLabel,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--Static ui dropdown selection disabled",
      children: [value || defaultValue, children]
    }), withCopy && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CopyButton.default, {
      value: value || defaultValue
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Static);

exports.default = _default;