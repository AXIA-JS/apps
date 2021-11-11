"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("./Icon.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function IconLink({
  className = '',
  href,
  icon,
  label,
  onClick,
  rel,
  target
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
    className: className,
    href: href,
    onClick: onClick,
    rel: rel,
    target: target,
    children: [icon && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
      icon: icon
    }), label]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(IconLink).withConfig({
  displayName: "IconLink",
  componentId: "sc-p8x4s4-0"
})([".ui--Icon{margin-right:0.5em;}"]));

exports.default = _default;