// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef, useState } from 'react';
import { useApi } from "./useApi.js";
import { transformIdentity, unsubscribe } from "./useCall.js";
import { useIsMountedRef } from "./useIsMountedRef.js";

// subscribe, trying to play nice with the browser threads
function subscribe(api, mountedRef, tracker, calls, setValue, {
  transform = transformIdentity
} = {}) {
  unsubscribe(tracker);
  setTimeout(() => {
    if (mountedRef.current) {
      const included = calls.map(c => !!c && (!Array.isArray(c) || !!c[0]));
      const filtered = calls.filter((_, index) => included[index]);

      if (filtered.length) {
        // swap to active mode
        tracker.current.isActive = true;
        tracker.current.subscriber = api.queryMulti(filtered, value => {
          // we use the isActive flag here since .subscriber may not be set on immediate callback)
          if (mountedRef.current && tracker.current.isActive) {
            let valueIndex = -1;
            mountedRef.current && tracker.current.isActive && setValue(transform(calls.map((_, index) => included[index] ? value[++valueIndex] : undefined)));
          }
        });
      } else {
        tracker.current.subscriber = null;
      }
    }
  }, 0);
} // very much copied from useCall


export function useCallMulti(calls, options) {
  const {
    api
  } = useApi();
  const mountedRef = useIsMountedRef();
  const tracker = useRef({
    isActive: false,
    serialized: null,
    subscriber: null
  });
  const [value, setValue] = useState((options || {}).defaultValue || []); // initial effect, we need an un-subscription

  useEffect(() => {
    return () => unsubscribe(tracker);
  }, []); // on changes, re-subscribe

  useEffect(() => {
    // check if we have a function & that we are mounted
    if (mountedRef.current && calls) {
      const serialized = JSON.stringify(calls);

      if (serialized !== tracker.current.serialized) {
        tracker.current.serialized = serialized;
        subscribe(api, mountedRef, tracker, calls, setValue, options);
      }
    }
  }, [api, calls, options, mountedRef]);
  return value;
}