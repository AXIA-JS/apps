// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef, useState } from 'react';
import { isNull, isUndefined } from '@axia-js/util';
import { useIsMountedRef } from "./useIsMountedRef.js";
// the default transform, just returns what we have
export function transformIdentity(value) {
  return value;
}

function isMapFn(fn) {
  var _meta, _meta$type;

  return !!((_meta = fn.meta) !== null && _meta !== void 0 && (_meta$type = _meta.type) !== null && _meta$type !== void 0 && _meta$type.isMap);
} // extract the serialized and mapped params, all ready for use in our call


function extractParams(fn, params, {
  paramMap = transformIdentity
} = {}) {
  return [JSON.stringify({
    f: fn === null || fn === void 0 ? void 0 : fn.name,
    p: params
  }), params.length === 0 || !params.some(param => isNull(param) || isUndefined(param)) ? paramMap(params) : null];
} // unsubscribe and remove from  the tracker


export function unsubscribe(tracker) {
  tracker.current.isActive = false;

  if (tracker.current.subscriber) {
    tracker.current.subscriber.then(u => u()).catch(console.error);
    tracker.current.subscriber = null;
  }
} // subscribe, trying to play nice with the browser threads

function subscribe(mountedRef, tracker, fn, params, setValue, {
  transform = transformIdentity,
  withParams,
  withParamsTransform
} = {}) {
  const validParams = params.filter(p => !isUndefined(p));
  unsubscribe(tracker);
  setTimeout(() => {
    if (mountedRef.current) {
      const canQuery = !!fn && (isMapFn(fn) ? fn.meta.type.asMap.hashers.length === validParams.length : true);

      if (canQuery) {
        // swap to active mode
        tracker.current.isActive = true;
        tracker.current.subscriber = fn(...params, value => {
          // we use the isActive flag here since .subscriber may not be set on immediate callback)
          if (mountedRef.current && tracker.current.isActive) {
            mountedRef.current && tracker.current.isActive && setValue(withParams ? [params, transform(value)] : withParamsTransform ? transform([params, value]) : transform(value));
          }
        });
      } else {
        tracker.current.subscriber = null;
      }
    }
  }, 0);
} // tracks a stream, typically an api.* call (derive, rpc, query) that
//  - returns a promise with an unsubscribe function
//  - has a callback to set the value
// FIXME The typings here need some serious TLC


export function useCall(fn, params, options) {
  const mountedRef = useIsMountedRef();
  const tracker = useRef({
    isActive: false,
    serialized: null,
    subscriber: null
  });
  const [value, setValue] = useState((options || {}).defaultValue); // initial effect, we need an un-subscription

  useEffect(() => {
    return () => unsubscribe(tracker);
  }, []); // on changes, re-subscribe

  useEffect(() => {
    // check if we have a function & that we are mounted
    if (mountedRef.current && fn) {
      const [serialized, mappedParams] = extractParams(fn, params || [], options);

      if (mappedParams && serialized !== tracker.current.serialized) {
        tracker.current.serialized = serialized;
        subscribe(mountedRef, tracker, fn, mappedParams, setValue, options);
      }
    }
  }, [fn, options, mountedRef, params]);
  return value;
}