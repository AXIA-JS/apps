// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useApi } from "./useApi.js";
import { useCall } from "./useCall.js";
export function useStakingInfo(accountId) {
  var _api$derive$staking;

  const {
    api
  } = useApi();
  return useCall((_api$derive$staking = api.derive.staking) === null || _api$derive$staking === void 0 ? void 0 : _api$derive$staking.account, [accountId]);
}