"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
function NodeVersion({
  children,
  className = '',
  label
}) {
  const {
    systemVersion
  } = (0, _reactHooks.useApi)(); // eg. 0.1.0-90d0bb6-x86_64-macos

  const displayVersion = systemVersion.split('-')[0];
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [label || '', displayVersion, children]
  });
}

var _default = /*#__PURE__*/_react.default.memo(NodeVersion);

exports.default = _default;