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
function Header({
  children,
  className
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Header).withConfig({
  displayName: "Header",
  componentId: "sc-11tvu8-0"
})(["text-transform:uppercase;font-size:0.714rem;line-height:0.857rem;margin-bottom:0.3rem;"]));

exports.default = _default;