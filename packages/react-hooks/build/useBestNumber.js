// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useApi } from "./useApi.js";
import { useCall } from "./useCall.js";
export function useBestNumber() {
  const {
    api
  } = useApi();
  return useCall(api.derive.chain.bestNumber);
}