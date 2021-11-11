"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useBalances;

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
const queryOptions = {
  transform: ([[params], balances]) => ({
    assetId: params[0][0],
    balances: params.map(([, accountId], index) => ({
      accountId,
      balance: balances[index]
    })).filter(({
      balance: {
        balance
      }
    }) => !balance.isZero())
  }),
  withParamsTransform: true
};

function useBalances(id) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const query = (0, _reactHooks.useCall)(id && api.query.assets.account.multi, id && [allAccounts.map(a => [id, a])], queryOptions);
  return query && id && query.assetId === id && query.balances || null;
}