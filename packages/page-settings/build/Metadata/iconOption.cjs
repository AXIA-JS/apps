"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = itemOption;

var _react = _interopRequireDefault(require("react"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
function itemOption(label, value, img) {
  return {
    text: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--Dropdown-item",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        alt: label,
        className: "ui--Dropdown-icon",
        src: img
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--Dropdown-name",
        children: label
      })]
    }, value),
    value
  };
}