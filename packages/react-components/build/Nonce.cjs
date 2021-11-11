"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactQuery = require("@axia-js/react-query");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function NonceDisplay({
  className = '',
  label,
  params
}) {
  if (!params) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.Nonce, {
    className: `ui--Nonce ${className}`,
    label: label,
    params: params.toString()
  });
}

var _default = /*#__PURE__*/_react.default.memo(NonceDisplay);

exports.default = _default;