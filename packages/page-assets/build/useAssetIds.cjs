"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAssetIds;

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
function extractAssetIds(keys) {
  return keys.map(({
    args: [assetId]
  }) => assetId).sort((a, b) => a.cmp(b));
}

function useAssetIds() {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const trigger = (0, _reactHooks.useEventTrigger)([api.events.assets.Created, api.events.assets.Destroyed]);
  return (0, _reactHooks.useMapKeys)(api.query.assets.asset, {
    at: trigger.blockHash,
    transform: extractAssetIds
  });
}