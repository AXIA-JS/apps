"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Chain({
  children,
  className = '',
  label
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    systemChain
  } = (0, _reactHooks.useApi)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [label || '', systemChain || t('Unknown'), children]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Chain);

exports.default = _default;