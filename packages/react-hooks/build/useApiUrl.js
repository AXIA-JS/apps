// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiPromise, WsProvider } from '@axia-js/api';
import { typesBundle, typesChain } from '@axia-js/apps-config';
import { isString } from '@axia-js/util';
import { useIsMountedRef } from "./useIsMountedRef.js";

function disconnect(api) {
  api && api.disconnect().catch(console.error);
}

export function useApiUrl(url) {
  const apiRef = useRef(null);
  const mountedRef = useIsMountedRef();
  const [state, setState] = useState(null);
  useEffect(() => {
    return () => {
      disconnect(apiRef.current);
      apiRef.current = null;
    };
  }, []);

  const _setApi = useCallback(api => {
    disconnect(apiRef.current);

    if (mountedRef.current) {
      apiRef.current = api;
      setState(api);
    }
  }, [mountedRef]);

  useEffect(() => {
    _setApi(null);

    url && (isString(url) || url.length) && ApiPromise.create({
      provider: new WsProvider(url),
      typesBundle,
      typesChain
    }).then(_setApi).catch(console.error);
  }, [_setApi, url]);
  return state;
}