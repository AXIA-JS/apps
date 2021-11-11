// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { useAccounts } from "./useAccounts.js";
import { useApi } from "./useApi.js";
import { useCall } from "./useCall.js";

function getStashes(allAccounts, ownBonded, ownLedger) {
  const result = [];
  ownBonded.forEach((value, index) => {
    value.isSome && result.push([allAccounts[index], true]);
  });
  ownLedger.forEach(ledger => {
    if (ledger.isSome) {
      const stashId = ledger.unwrap().stash.toString();
      !result.some(([accountId]) => accountId === stashId) && result.push([stashId, false]);
    }
  });
  return result;
}

export function useOwnStashes() {
  var _api$query$staking, _api$query$staking2;

  const {
    allAccounts,
    hasAccounts
  } = useAccounts();
  const {
    api
  } = useApi();
  const ownBonded = useCall(hasAccounts && ((_api$query$staking = api.query.staking) === null || _api$query$staking === void 0 ? void 0 : _api$query$staking.bonded.multi), [allAccounts]);
  const ownLedger = useCall(hasAccounts && ((_api$query$staking2 = api.query.staking) === null || _api$query$staking2 === void 0 ? void 0 : _api$query$staking2.ledger.multi), [allAccounts]);
  return useMemo(() => hasAccounts ? ownBonded && ownLedger ? getStashes(allAccounts, ownBonded, ownLedger) : undefined : [], [allAccounts, hasAccounts, ownBonded, ownLedger]);
}
export function useOwnStashIds() {
  const ownStashes = useOwnStashes();
  return useMemo(() => ownStashes ? ownStashes.map(([stashId]) => stashId) : undefined, [ownStashes]);
}