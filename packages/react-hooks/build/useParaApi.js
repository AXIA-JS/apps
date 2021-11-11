// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useApiUrl } from "./useApiUrl.js";
import { useIsMountedRef } from "./useIsMountedRef.js";
import { useParaEndpoints } from "./useParaEndpoints.js";

// use from @axia-js/util
function arrayShuffle(result) {
  let currentIndex = result.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [result[currentIndex], result[randomIndex]] = [result[randomIndex], result[currentIndex]];
  }

  return result;
}

export function useParaApi(paraId) {
  const mountedRef = useIsMountedRef();
  const endpoints = useParaEndpoints(paraId);
  const [state, setState] = useState(() => ({
    api: null,
    endpoints,
    urls: []
  }));
  const api = useApiUrl(state.urls);
  useEffect(() => {
    mountedRef.current && setState({
      api: null,
      endpoints,
      urls: arrayShuffle(endpoints.map(({
        value
      }) => value))
    });
  }, [endpoints, mountedRef]);
  useEffect(() => {
    mountedRef.current && setState(({
      endpoints,
      urls
    }) => ({
      api,
      endpoints,
      urls
    }));
  }, [api, mountedRef]);
  return state;
}