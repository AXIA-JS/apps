// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { useApi, useCallMulti, useEventTrigger, useIsMountedRef, useMapEntries, useMapKeys } from '@axia-js/react-hooks';
const optionsMulti = {
  defaultValue: [undefined, undefined]
};

function extractProposalIds(keys) {
  return keys.map(({
    args: [id]
  }) => id);
}

function extractScheduled(entries) {
  return entries.map(([{
    args: [sessionIndex]
  }, scheduledIds]) => ({
    scheduledIds,
    sessionIndex
  }));
}

export default function useProposals() {
  var _api$events$proposeAl, _api$query$proposeAll, _api$query$proposeAll2, _api$query$proposeAll3;

  const {
    api
  } = useApi();
  const mountedRef = useIsMountedRef();
  const trigger = useEventTrigger([(_api$events$proposeAl = api.events.proposeAllychain) === null || _api$events$proposeAl === void 0 ? void 0 : _api$events$proposeAl.ProposeAllychain]);
  const proposalIds = useMapKeys((_api$query$proposeAll = api.query.proposeAllychain) === null || _api$query$proposeAll === void 0 ? void 0 : _api$query$proposeAll.proposals, {
    at: trigger.blockHash,
    transform: extractProposalIds
  });
  const scheduled = useMapEntries((_api$query$proposeAll2 = api.query.proposeAllychain) === null || _api$query$proposeAll2 === void 0 ? void 0 : _api$query$proposeAll2.scheduledProposals, {
    at: trigger.blockHash,
    transform: extractScheduled
  });
  const [sessionIndex, approvedIds] = useCallMulti([api.query.session.currentIndex, (_api$query$proposeAll3 = api.query.proposeAllychain) === null || _api$query$proposeAll3 === void 0 ? void 0 : _api$query$proposeAll3.approvedProposals], optionsMulti);
  return useMemo(() => approvedIds && sessionIndex && proposalIds && scheduled && mountedRef.current ? {
    approvedIds,
    proposalIds,
    scheduled: scheduled.filter(s => s.sessionIndex.gt(sessionIndex))
  } : undefined, [approvedIds, mountedRef, proposalIds, sessionIndex, scheduled]);
}