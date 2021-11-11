// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useApi } from "./useApi.js";
import { useCall } from "./useCall.js";
const optCall = {
  transform: header => header.hash.toHex()
};
export function useBestHash() {
  const {
    api
  } = useApi();
  return useCall(api.rpc.chain.subscribeNewHeads, undefined, optCall);
}