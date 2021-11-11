"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createHeader;

var _react = _interopRequireDefault(require("react"));

var _Dropdown = _interopRequireDefault(require("../Dropdown.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createHeader(option) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Dropdown.default.Header, {
    content: option.name
  }, option.key || option.name);
}