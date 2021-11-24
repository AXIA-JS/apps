"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useProposals;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
const optionsMulti = {
  defaultValue: [undefined, undefined]
};

function extractProposalIds(keys) {
  return keys.map(_ref => {
    let {
      args: [id]
    } = _ref;
    return id;
  });
}

function extractScheduled(entries) {
  return entries.map(_ref2 => {
    let [{
      args: [sessionIndex]
    }, scheduledIds] = _ref2;
    return {
      scheduledIds,
      sessionIndex
    };
  });
}

function useProposals() {
  var _api$events$proposeAl, _api$query$proposeAll, _api$query$proposeAll2, _api$query$proposeAll3;

  const {
    api
  } = (0, _reactHooks.useApi)();
  const mountedRef = (0, _reactHooks.useIsMountedRef)();
  const trigger = (0, _reactHooks.useEventTrigger)([(_api$events$proposeAl = api.events.proposeAllychain) === null || _api$events$proposeAl === void 0 ? void 0 : _api$events$proposeAl.ProposeAllychain]);
  const proposalIds = (0, _reactHooks.useMapKeys)((_api$query$proposeAll = api.query.proposeAllychain) === null || _api$query$proposeAll === void 0 ? void 0 : _api$query$proposeAll.proposals, {
    at: trigger.blockHash,
    transform: extractProposalIds
  });
  const scheduled = (0, _reactHooks.useMapEntries)((_api$query$proposeAll2 = api.query.proposeAllychain) === null || _api$query$proposeAll2 === void 0 ? void 0 : _api$query$proposeAll2.scheduledProposals, {
    at: trigger.blockHash,
    transform: extractScheduled
  });
  const [sessionIndex, approvedIds] = (0, _reactHooks.useCallMulti)([api.query.session.currentIndex, (_api$query$proposeAll3 = api.query.proposeAllychain) === null || _api$query$proposeAll3 === void 0 ? void 0 : _api$query$proposeAll3.approvedProposals], optionsMulti);
  return (0, _react.useMemo)(() => approvedIds && sessionIndex && proposalIds && scheduled && mountedRef.current ? {
    approvedIds,
    proposalIds,
    scheduled: scheduled.filter(s => s.sessionIndex.gt(sessionIndex))
  } : undefined, [approvedIds, mountedRef, proposalIds, sessionIndex, scheduled]);
}