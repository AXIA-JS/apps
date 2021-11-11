// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useApi } from "./useApi.js";
import { useCall } from "./useCall.js";
import { useIsMountedRef } from "./useIsMountedRef.js";
export function useExtrinsicTrigger(checks) {
  const {
    api
  } = useApi();
  const [trigger, setTrigger] = useState('0');
  const mountedRef = useIsMountedRef();
  const block = useCall(api.derive.chain.subscribeNewBlocks);
  useEffect(() => {
    mountedRef.current && block && block.extrinsics && block.extrinsics.filter(({
      extrinsic
    }) => extrinsic && checks.some(c => c && c.is(extrinsic))).length && setTrigger(() => {
      var _block$createdAtHash;

      return ((_block$createdAtHash = block.createdAtHash) === null || _block$createdAtHash === void 0 ? void 0 : _block$createdAtHash.toHex()) || '';
    });
  }, [block, checks, mountedRef]);
  return trigger;
}