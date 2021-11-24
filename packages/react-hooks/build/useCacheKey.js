// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useMemo } from 'react';
import store from 'store';
import { useApi } from "./useApi.js"; // create a chain-specific key for the local cache

export function useCacheKey(storageKeyBase) {
  const {
    api,
    isDevelopment
  } = useApi();
  const storageKey = useMemo(() => `${storageKeyBase}:${isDevelopment ? 'development' : api.genesisHash.toHex()}`, [api, isDevelopment, storageKeyBase]); // FIXME both these want "T"... incorrect

  const getter = useCallback(() => store.get(storageKey), [storageKey]);
  const setter = useCallback(value => store.set(storageKey, value), [storageKey]);
  return [getter, setter];
}