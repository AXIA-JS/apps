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
function AvatarItem(_ref) {
  let {
    children,
    className = '',
    icon,
    isBig,
    subtitle,
    title
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: ['ui--AvatarItem', className, isBig && 'big'].join(' '),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--AvatarItem-icon",
      children: icon
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--AvatarItem-details",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--AvatarItem-title",
        children: title
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--AvatarItem-subtitle",
        children: subtitle
      })]
    }), children]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(AvatarItem).withConfig({
  displayName: "AvatarItem",
  componentId: "sc-1f7kq23-0"
})(["&{display:flex;align-items:center;.ui--AvatarItem-icon{margin-right:0.5rem;display:flex;align-items:center;justify-content:center;}}.ui--AvatarItem-details{.ui--AvatarItem-title{font-weight:600;font-size:1rem;}.ui--AvatarItem-subtitle{font-weight:var(--font-weight-normal);font-size:1rem;}}&.big{.ui--AvatarItem-icon{width:3.4rem;height:3.4rem;margin-right:0.6rem;> .ui--Icon{font-size:1.6rem;line-height:3.4rem;}}.ui--AvatarItem-details{.ui--AvatarItem-name{font-size:1.4rem;line-height:1.4rem;}}}"]));

exports.default = _default;