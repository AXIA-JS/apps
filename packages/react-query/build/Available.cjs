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
function AvailableDisplay(_ref) {
  var _api$derive$balances;

  let {
    children,
    className = '',
    label,
    params
  } = _ref;
  const {
    api
  } = (0, _reactHooks.useApi)();
  const allBalances = (0, _reactHooks.useCall)((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [params]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormatBalance.default, {
    className: className,
    label: label,
    value: allBalances === null || allBalances === void 0 ? void 0 : allBalances.availableBalance,
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo(AvailableDisplay);

exports.default = _default;