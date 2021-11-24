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
function StakingBonded(_ref) {
  var _stakingInfo$stakingL, _stakingInfo$stakingL2;

  let {
    className = '',
    stakingInfo
  } = _ref;
  const balance = stakingInfo === null || stakingInfo === void 0 ? void 0 : (_stakingInfo$stakingL = stakingInfo.stakingLedger) === null || _stakingInfo$stakingL === void 0 ? void 0 : (_stakingInfo$stakingL2 = _stakingInfo$stakingL.active) === null || _stakingInfo$stakingL2 === void 0 ? void 0 : _stakingInfo$stakingL2.unwrap();

  if (!(balance !== null && balance !== void 0 && balance.gtn(0))) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
    className: className,
    value: balance
  });
}

var _default = /*#__PURE__*/_react.default.memo(StakingBonded);

exports.default = _default;