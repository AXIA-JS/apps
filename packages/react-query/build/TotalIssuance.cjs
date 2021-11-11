"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _FormatBalance = _interopRequireDefault(require("./FormatBalance.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
function TotalIssuance({
  children,
  className = '',
  label
}) {
  var _api$query$balances;

  const {
    api
  } = (0, _reactHooks.useApi)();
  const totalIssuance = (0, _reactHooks.useCall)((_api$query$balances = api.query.balances) === null || _api$query$balances === void 0 ? void 0 : _api$query$balances.totalIssuance);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [label || '', /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormatBalance.default, {
      value: totalIssuance,
      withSi: true
    }), children]
  });
}

var _default = /*#__PURE__*/_react.default.memo(TotalIssuance);

exports.default = _default;