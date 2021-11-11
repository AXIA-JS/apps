// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
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
  var _api$events$proposePa, _api$query$proposePar, _api$query$proposePar2, _api$query$proposePar3;

  const {
    api
  } = useApi();
  const mountedRef = useIsMountedRef();
  const trigger = useEventTrigger([(_api$events$proposePa = api.events.proposeParachain) === null || _api$events$proposePa === void 0 ? void 0 : _api$events$proposePa.ProposeParachain]);
  const proposalIds = useMapKeys((_api$query$proposePar = api.query.proposeParachain) === null || _api$query$proposePar === void 0 ? void 0 : _api$query$proposePar.proposals, {
    at: trigger.blockHash,
    transform: extractProposalIds
  });
  const scheduled = useMapEntries((_api$query$proposePar2 = api.query.proposeParachain) === null || _api$query$proposePar2 === void 0 ? void 0 : _api$query$proposePar2.scheduledProposals, {
    at: trigger.blockHash,
    transform: extractScheduled
  });
  const [sessionIndex, approvedIds] = useCallMulti([api.query.session.currentIndex, (_api$query$proposePar3 = api.query.proposeParachain) === null || _api$query$proposePar3 === void 0 ? void 0 : _api$query$proposePar3.approvedProposals], optionsMulti);
  return useMemo(() => approvedIds && sessionIndex && proposalIds && scheduled && mountedRef.current ? {
    approvedIds,
    proposalIds,
    scheduled: scheduled.filter(s => s.sessionIndex.gt(sessionIndex))
  } : undefined, [approvedIds, mountedRef, proposalIds, sessionIndex, scheduled]);
}