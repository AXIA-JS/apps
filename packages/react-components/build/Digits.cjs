"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Digits({
  className = '',
  value
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: value.split(',').map((parts, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "group",
      children: [index !== 0 ? ',' : '', parts.split('').map((d, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "digit",
        children: d
      }, index))]
    }, index))
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Digits).withConfig({
  displayName: "Digits",
  componentId: "sc-1nhc2iv-0"
})(["display:inline-block;white-space:nowrap;.group{display:inline-block;.digit{display:inline-block;text-align:center;width:1ch;}}"]));

exports.default = _default;