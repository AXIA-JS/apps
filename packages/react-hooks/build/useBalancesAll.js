// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useApi } from "./useApi.js";
import { useCall } from "./useCall.js";
/**
 * Gets the account full balance information
 *
 * @param accountAddress The account address of which balance is to be returned
 * @returns full information about account's balances
 */

export function useBalancesAll(accountAddress) {
  var _api$derive$balances;

  const {
    api
  } = useApi();
  return useCall((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [accountAddress]);
}