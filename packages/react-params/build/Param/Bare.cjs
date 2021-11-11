"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Bare({
  children,
  className = ''
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `ui--row ${className}`,
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Bare).withConfig({
  displayName: "Bare",
  componentId: "sc-disy88-0"
})(["position:relative;"]));

exports.default = _default;