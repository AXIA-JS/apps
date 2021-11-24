"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformIdentity = transformIdentity;
exports.unsubscribe = unsubscribe;
exports.useCall = useCall;

var _react = require("react");

var _util = require("@axia-js/util");

var _useIsMountedRef = require("./useIsMountedRef.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
// the default transform, just returns what we have
function transformIdentity(value) {
  return value;
}

function isMapFn(fn) {
  var _meta, _meta$type;

  return !!((_meta = fn.meta) !== null && _meta !== void 0 && (_meta$type = _meta.type) !== null && _meta$type !== void 0 && _meta$type.isMap);
} // extract the serialized and mapped params, all ready for use in our call


function extractParams(fn, params) {
  let {
    paramMap = transformIdentity
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return [JSON.stringify({
    f: fn === null || fn === void 0 ? void 0 : fn.name,
    p: params
  }), params.length === 0 || !params.some(param => (0, _util.isNull)(param) || (0, _util.isUndefined)(param)) ? paramMap(params) : null];
} // unsubscribe and remove from  the tracker


function unsubscribe(tracker) {
  tracker.current.isActive = false;

  if (tracker.current.subscriber) {
    tracker.current.subscriber.then(u => u()).catch(console.error);
    tracker.current.subscriber = null;
  }
} // subscribe, trying to play nice with the browser threads


function subscribe(mountedRef, tracker, fn, params, setValue) {
  let {
    transform = transformIdentity,
    withParams,
    withParamsTransform
  } = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  const validParams = params.filter(p => !(0, _util.isUndefined)(p));
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


function useCall(fn, params, options) {
  const mountedRef = (0, _useIsMountedRef.useIsMountedRef)();
  const tracker = (0, _react.useRef)({
    isActive: false,
    serialized: null,
    subscriber: null
  });
  const [value, setValue] = (0, _react.useState)((options || {}).defaultValue); // initial effect, we need an un-subscription

  (0, _react.useEffect)(() => {
    return () => unsubscribe(tracker);
  }, []); // on changes, re-subscribe

  (0, _react.useEffect)(() => {
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