"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTipHashes;

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
function extractHashes(keys) {
  return keys.map(({
    args: [hash]
  }) => hash.toHex());
}

function useTipHashes() {
  var _api$events$tips, _api$events$tips2, _api$events$tips3, _ref;

  const {
    api
  } = (0, _reactHooks.useApi)();
  const trigger = (0, _reactHooks.useEventTrigger)([(_api$events$tips = api.events.tips) === null || _api$events$tips === void 0 ? void 0 : _api$events$tips.NewTip, (_api$events$tips2 = api.events.tips) === null || _api$events$tips2 === void 0 ? void 0 : _api$events$tips2.TipClosed, (_api$events$tips3 = api.events.tips) === null || _api$events$tips3 === void 0 ? void 0 : _api$events$tips3.TipRetracted]);
  return (0, _reactHooks.useMapKeys)((_ref = api.query.tips || api.query.treasury) === null || _ref === void 0 ? void 0 : _ref.tips, {
    at: trigger.blockHash,
    transform: extractHashes
  });
}