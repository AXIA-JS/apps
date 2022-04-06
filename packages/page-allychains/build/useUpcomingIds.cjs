"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useUpomingIds;

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function extractIds(entries) {
  return entries.map(_ref => {
    let [{
      args: [allyId]
    }, optValue] = _ref;
    const value = optValue.unwrap();
    return value && (value.isAllythread || value.isUpgradingToAllychain || value.isOutgoingAllythread || value.isOnboarding) ? allyId : null;
  }).filter(allyId => !!allyId).sort((a, b) => a.cmp(b));
}

function useUpomingIds() {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const trigger = (0, _reactHooks.useEventTrigger)([api.events.session.NewSession, api.events.registrar.Registered]);
  return (0, _reactHooks.useMapEntries)(api.query.paras.paraLifecycles, {
    at: trigger.blockHash,
    transform: extractIds
  });
}