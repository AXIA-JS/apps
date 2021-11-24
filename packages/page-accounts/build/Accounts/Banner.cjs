"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Banner(_ref) {
  let {
    children,
    className = '',
    type
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("article", {
    className: `${className} ${type} centered`,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "box",
      children: children
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Banner).withConfig({
  displayName: "Banner",
  componentId: "sc-7zx6r9-0"
})([".box{padding:0 0.5rem;}"]));

exports.default = _default;