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
const transformController = {
  transform: value => value.unwrapOr(null)
};
const transformLedger = {
  transform: value => value.unwrapOr(null)
};

function BondedDisplay(_ref) {
  var _api$query$staking, _api$query$staking2;

  let {
    children,
    className = '',
    label,
    params
  } = _ref;
  const {
    api
  } = (0, _reactHooks.useApi)();
  const controllerId = (0, _reactHooks.useCall)((_api$query$staking = api.query.staking) === null || _api$query$staking === void 0 ? void 0 : _api$query$staking.bonded, [params], transformController);
  const stakingLedger = (0, _reactHooks.useCall)(controllerId && ((_api$query$staking2 = api.query.staking) === null || _api$query$staking2 === void 0 ? void 0 : _api$query$staking2.ledger), [controllerId], transformLedger);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormatBalance.default, {
    className: className,
    label: label,
    value: stakingLedger === null || stakingLedger === void 0 ? void 0 : stakingLedger.active,
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo(BondedDisplay);

exports.default = _default;