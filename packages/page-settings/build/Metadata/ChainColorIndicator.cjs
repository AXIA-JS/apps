"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ChainColorIndicator({
  className,
  color
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    color: color
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(ChainColorIndicator).withConfig({
  displayName: "ChainColorIndicator",
  componentId: "sc-b8p0w0-0"
})(["background-color:", " !important;width:100px;flex:1;border-radius:4px;"], props => props.color));

exports.default = _default;