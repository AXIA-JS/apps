// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useApi, useEventTrigger, useMapEntries } from '@axia-js/react-hooks';

function extractIds(entries) {
  return entries.map(([{
    args: [allyId]
  }, optValue]) => {
    const value = optValue.unwrap();
    return value && (value.isAllythread || value.isUpgradingToAllychain || value.isOutgoingAllythread || value.isOnboarding) ? allyId : null;
  }).filter(allyId => !!allyId).sort((a, b) => a.cmp(b));
}

export default function useUpomingIds() {
  const {
    api
  } = useApi();
  const trigger = useEventTrigger([api.events.session.NewSession, api.events.registrar.Registered]);
  return useMapEntries(api.query.paras.paraLifecycles, {
    at: trigger.blockHash,
    transform: extractIds
  });
}