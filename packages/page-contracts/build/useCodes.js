// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useIsMountedRef } from '@axia-js/react-hooks';
import store from "./store.js";
const DEFAULT_STATE = {
  allCodes: [],
  codeTrigger: Date.now()
};
export function useCodes() {
  const mountedRef = useIsMountedRef();
  const [state, setState] = useState(DEFAULT_STATE);
  useEffect(() => {
    const triggerUpdate = () => {
      mountedRef.current && setState({
        allCodes: store.getAllCode(),
        codeTrigger: Date.now()
      });
    };

    store.on('new-code', triggerUpdate);
    store.on('removed-code', triggerUpdate);
    store.loadAll(triggerUpdate);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  return state;
}