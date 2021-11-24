// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useApi, useEventTrigger, useMapKeys } from '@axia-js/react-hooks';

function extractHashes(keys) {
  return keys.map(({
    args: [hash]
  }) => hash.toHex());
}

export default function useTipHashes() {
  var _api$events$tips, _api$events$tips2, _api$events$tips3, _ref;

  const {
    api
  } = useApi();
  const trigger = useEventTrigger([(_api$events$tips = api.events.tips) === null || _api$events$tips === void 0 ? void 0 : _api$events$tips.NewTip, (_api$events$tips2 = api.events.tips) === null || _api$events$tips2 === void 0 ? void 0 : _api$events$tips2.TipClosed, (_api$events$tips3 = api.events.tips) === null || _api$events$tips3 === void 0 ? void 0 : _api$events$tips3.TipRetracted]);
  return useMapKeys((_ref = api.query.tips || api.query.treasury) === null || _ref === void 0 ? void 0 : _ref.tips, {
    at: trigger.blockHash,
    transform: extractHashes
  });
}