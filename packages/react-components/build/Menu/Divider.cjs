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
function Divider(_ref) {
  let {
    className = ''
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `ui--Menu__Divider ${className}`
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Divider).withConfig({
  displayName: "Divider",
  componentId: "sc-15x4n8b-0"
})(["margin:0.25rem 0 1rem;border-top:1px solid var(--border-table);&:first-child,&:last-child{display:none}"]));

exports.default = _default;