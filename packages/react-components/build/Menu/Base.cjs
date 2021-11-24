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
function Base(_ref) {
  let {
    children,
    className = ''
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `ui--Menu ${className}`,
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Base).withConfig({
  displayName: "Base",
  componentId: "sc-zfjpr9-0"
})(["display:flex;flex-direction:column;min-width:14.286rem;margin:1rem 0;& > *:not(.ui--Menu__Item):not(.ui--Menu__Divider){margin-right:1rem;margin-left:1rem;}"]));

exports.default = _default;