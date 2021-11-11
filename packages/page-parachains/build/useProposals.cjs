"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useProposals;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
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

function useProposals() {
  var _api$events$proposePa, _api$query$proposePar, _api$query$proposePar2, _api$query$proposePar3;

  const {
    api
  } = (0, _reactHooks.useApi)();
  const mountedRef = (0, _reactHooks.useIsMountedRef)();
  const trigger = (0, _reactHooks.useEventTrigger)([(_api$events$proposePa = api.events.proposeParachain) === null || _api$events$proposePa === void 0 ? void 0 : _api$events$proposePa.ProposeParachain]);
  const proposalIds = (0, _reactHooks.useMapKeys)((_api$query$proposePar = api.query.proposeParachain) === null || _api$query$proposePar === void 0 ? void 0 : _api$query$proposePar.proposals, {
    at: trigger.blockHash,
    transform: extractProposalIds
  });
  const scheduled = (0, _reactHooks.useMapEntries)((_api$query$proposePar2 = api.query.proposeParachain) === null || _api$query$proposePar2 === void 0 ? void 0 : _api$query$proposePar2.scheduledProposals, {
    at: trigger.blockHash,
    transform: extractScheduled
  });
  const [sessionIndex, approvedIds] = (0, _reactHooks.useCallMulti)([api.query.session.currentIndex, (_api$query$proposePar3 = api.query.proposeParachain) === null || _api$query$proposePar3 === void 0 ? void 0 : _api$query$proposePar3.approvedProposals], optionsMulti);
  return (0, _react.useMemo)(() => approvedIds && sessionIndex && proposalIds && scheduled && mountedRef.current ? {
    approvedIds,
    proposalIds,
    scheduled: scheduled.filter(s => s.sessionIndex.gt(sessionIndex))
  } : undefined, [approvedIds, mountedRef, proposalIds, sessionIndex, scheduled]);
}