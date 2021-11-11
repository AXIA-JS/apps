"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBalancesAll = useBalancesAll;

var _useApi = require("./useApi.cjs");

var _useCall = require("./useCall.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * Gets the account full balance information
 *
 * @param accountAddress The account address of which balance is to be returned
 * @returns full information about account's balances
 */
function useBalancesAll(accountAddress) {
  var _api$derive$balances;

  const {
    api
  } = (0, _useApi.useApi)();
  return (0, _useCall.useCall)((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [accountAddress]);
}