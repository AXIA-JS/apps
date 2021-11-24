"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _theme = require("./styles/theme.cjs");

var _Icon = _interopRequireDefault(require("./Icon.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function EditButton(_ref) {
  let {
    children,
    className = '',
    icon = 'edit',
    onClick
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--EditButton ${className}`,
    onClick: onClick,
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "editSpan",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
        className: "icon-button",
        icon: icon
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(EditButton).withConfig({
  displayName: "EditButton",
  componentId: "sc-1mmejic-0"
})(["cursor:pointer;.ui--Icon.icon-button{color:", ";cursor:pointer;margin:0 0 0 0.5rem;}.editSpan{white-space:nowrap;}"], _theme.colorLink));

exports.default = _default;