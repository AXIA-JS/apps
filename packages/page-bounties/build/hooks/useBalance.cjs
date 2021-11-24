"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBalance = useBalance;

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useBalance(accountId) {
  var _useCall, _api$derive$balances;

  const {
    api
  } = (0, _reactHooks.useApi)();
  return (_useCall = (0, _reactHooks.useCall)((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [accountId])) === null || _useCall === void 0 ? void 0 : _useCall.availableBalance;
}