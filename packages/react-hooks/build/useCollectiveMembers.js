// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { useAccounts } from "./useAccounts.js";
import { useApi } from "./useApi.js";
import { useCall } from "./useCall.js";
const transformMembers = {
  transform: accounts => accounts.map(accountId => accountId.toString())
};
export function useCollectiveMembers(collective) {
  var _api$derive$collectiv;

  const {
    api
  } = useApi();
  const {
    allAccounts,
    hasAccounts
  } = useAccounts();
  const retrieved = useCall(hasAccounts && ((_api$derive$collectiv = api.derive[collective]) === null || _api$derive$collectiv === void 0 ? void 0 : _api$derive$collectiv.members), undefined, transformMembers);
  return useMemo(() => ({
    isMember: (retrieved || []).some(accountId => allAccounts.includes(accountId)),
    members: retrieved || []
  }), [allAccounts, retrieved]);
}