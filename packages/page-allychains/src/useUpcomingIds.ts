// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option, StorageKey } from '@axia-js/types';
import type { AllyId, ParaLifecycle } from '@axia-js/types/interfaces';

import { useApi, useEventTrigger, useMapEntries } from '@axia-js/react-hooks';

function extractIds (entries: [StorageKey<[AllyId]>, Option<ParaLifecycle>][]): AllyId[] {
  return entries
    .map(([{ args: [allyId] }, optValue]): AllyId | null => {
      const value = optValue.unwrap();

      return value && (
        value.isAllythread ||
        value.isUpgradingToAllychain ||
        value.isOutgoingAllythread ||
        value.isOnboarding
      )
        ? allyId
        : null;
    })
    .filter((allyId): allyId is AllyId => !!allyId)
    .sort((a, b) => a.cmp(b));
}

export default function useUpomingIds (): AllyId[] | undefined {
  const { api } = useApi();
  const trigger = useEventTrigger([api.events.session.NewSession, api.events.registrar.Registered]);

  return useMapEntries(api.query.paras.paraLifecycles, { at: trigger.blockHash, transform: extractIds });
}
