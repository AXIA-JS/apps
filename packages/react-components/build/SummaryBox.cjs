"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SummaryBox({
  children,
  className = '',
  isSmall
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `${className}${isSmall ? ' isSmall' : ''}`,
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(SummaryBox).withConfig({
  displayName: "SummaryBox",
  componentId: "sc-1oyq085-0"
})(["align-items:stretch;border-radius:0.25rem;display:flex;flex-wrap:no-wrap;justify-content:space-between;margin:1.5rem 0;> section{display:flex;flex:0 1 auto;text-align:left;}details &{display:block;margin:0.5rem 0.25rem;opacity:0.75;outline:none;overflow:hidden;text-align:left;text-overflow:ellipsis;white-space:nowrap;+ div{margin-top:0.75rem;}}&.isSmall{margin-bottom:0;}.ui.label{padding-left:0;padding-right:0;padding-top:0;}"]));

exports.default = _default;