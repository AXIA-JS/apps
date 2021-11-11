// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useApi, useEventTrigger, useMapKeys } from '@axia-js/react-hooks';

function extractAssetIds(keys) {
  return keys.map(({
    args: [assetId]
  }) => assetId).sort((a, b) => a.cmp(b));
}

export default function useAssetIds() {
  const {
    api
  } = useApi();
  const trigger = useEventTrigger([api.events.assets.Created, api.events.assets.Destroyed]);
  return useMapKeys(api.query.assets.asset, {
    at: trigger.blockHash,
    transform: extractAssetIds
  });
}