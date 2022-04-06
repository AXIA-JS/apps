// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option, StorageKey } from '@axia-js/types';
import type { Hash, AllyId, ParaInfo } from '@axia-js/types/interfaces';
import type { OwnedId, OwnedIdPartial } from './types';

import { useMemo } from 'react';

import { useAccounts, useApi, useCall, useEventTrigger, useMapEntries } from '@axia-js/react-hooks';

interface CodeHash {
  hash: Hash | null;
  allyId: AllyId;
}

interface Owned {
  ids: AllyId[];
  owned: OwnedIdPartial[];
}

function extractIds (entries: [StorageKey<[AllyId]>, Option<ParaInfo>][]): Owned {
  const owned = entries
    .map(([{ args: [allyId] }, optInfo]): OwnedIdPartial | null => {
      if (optInfo.isNone) {
        return null;
      }

      const paraInfo = optInfo.unwrap();

      return {
        manager: paraInfo.manager.toString(),
        allyId,
        paraInfo
      };
    })
    .filter((id): id is OwnedIdPartial => !!id);

  return {
    ids: owned.map(({ allyId }) => allyId),
    owned
  };
}

const hashesOption = {
  transform: ([[allyIds], optHashes]: [[AllyId[]], Option<Hash>[]]) =>
    allyIds.map((allyId, index): CodeHash => ({
      hash: optHashes[index].unwrapOr(null),
      allyId
    })),
  withParamsTransform: true
};

export default function useOwnedIds (): OwnedId[] {
  const { api } = useApi();
  const { allAccounts } = useAccounts();
  const trigger = useEventTrigger([api.events.registrar.Registered, api.events.registrar.Reserved]);
  const unfiltered = useMapEntries<Owned>(api.query.registrar.paras, { at: trigger.blockHash, transform: extractIds });
  const hashes = useCall(api.query.paras.currentCodeHash.multi, [unfiltered ? unfiltered.ids : []], hashesOption);

  return useMemo(
    () => unfiltered && hashes
      ? unfiltered.owned
        .filter((id) => allAccounts.some((a) => a === id.manager))
        .map((data): OwnedId => ({
          ...data,
          hasCode: hashes.some(({ hash, allyId }) => !!hash && allyId.eq(data.allyId))
        }))
      : [],
    [allAccounts, hashes, unfiltered]
  );
}
