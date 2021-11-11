"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.balanceToNumber = balanceToNumber;

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function balanceToNumber(amount = _util.BN_ZERO, divisor) {
  const value = (0, _util.isBn)(amount) ? amount : (0, _util.isFunction)(amount.toBn) ? amount.toBn() : _util.BN_ZERO;
  return value.mul(_util.BN_THOUSAND).div(divisor).toNumber() / 1000;
}