"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("../Icon.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2020 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function CurrentSection({
  className = '',
  icon,
  text
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `${className} active-tab`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
      icon: icon
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: text
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(CurrentSection).withConfig({
  displayName: "CurrentSection",
  componentId: "sc-15jy6cj-0"
})(["margin:0 2.5rem 0 1.5rem;font-weight:400;font-size:1rem;line-height:1.57rem;min-width:max-content;height:100%;display:flex;align-items:center;color:var(--color-text);.ui--Icon{margin-right:0.85rem;max-width:1rem;max-height:1rem;}@media only screen and (max-width:900px){margin:0 1.5rem;}"]));

exports.default = _default;