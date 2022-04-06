// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { StorageKey } from '@axia-js/types';
import type { AllyId, SessionIndex } from '@axia-js/types/interfaces';
import type { Proposals } from './types';

import { useMemo } from 'react';

import { useApi, useCallMulti, useEventTrigger, useIsMountedRef, useMapEntries, useMapKeys } from '@axia-js/react-hooks';

type MultiQuery = [SessionIndex | undefined, AllyId[] | undefined];

interface Scheduled {
  scheduledIds: AllyId[];
  sessionIndex: SessionIndex;
}

const optionsMulti = {
  defaultValue: [undefined, undefined] as MultiQuery
};

function extractProposalIds (keys: StorageKey<[AllyId]>[]): AllyId[] {
  return keys.map(({ args: [id] }) => id);
}

function extractScheduled (entries: [StorageKey<[SessionIndex]>, AllyId[]][]): Scheduled[] {
  return entries.map(([{ args: [sessionIndex] }, scheduledIds]) => ({
    scheduledIds,
    sessionIndex
  }));
}

export default function useProposals (): Proposals | undefined {
  const { api } = useApi();
  const mountedRef = useIsMountedRef();
  const trigger = useEventTrigger([api.events.proposeAllychain?.ProposeAllychain]);
  const proposalIds = useMapKeys(api.query.proposeAllychain?.proposals, { at: trigger.blockHash, transform: extractProposalIds });
  const scheduled = useMapEntries(api.query.proposeAllychain?.scheduledProposals, { at: trigger.blockHash, transform: extractScheduled });
  const [sessionIndex, approvedIds] = useCallMulti<MultiQuery>([
    api.query.session.currentIndex,
    api.query.proposeAllychain?.approvedProposals
  ], optionsMulti);

  return useMemo(
    () => approvedIds && sessionIndex && proposalIds && scheduled && mountedRef.current
      ? {
        approvedIds,
        proposalIds,
        scheduled: scheduled.filter((s) => s.sessionIndex.gt(sessionIndex))
      }
      : undefined,
    [approvedIds, mountedRef, proposalIds, sessionIndex, scheduled]
  );
}
