"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCallMulti = useCallMulti;

var _react = require("react");

var _useApi = require("./useApi.cjs");

var _useCall = require("./useCall.cjs");

var _useIsMountedRef = require("./useIsMountedRef.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
// subscribe, trying to play nice with the browser threads
function subscribe(api, mountedRef, tracker, calls, setValue) {
  let {
    transform = _useCall.transformIdentity
  } = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  (0, _useCall.unsubscribe)(tracker);
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


function useCallMulti(calls, options) {
  const {
    api
  } = (0, _useApi.useApi)();
  const mountedRef = (0, _useIsMountedRef.useIsMountedRef)();
  const tracker = (0, _react.useRef)({
    isActive: false,
    serialized: null,
    subscriber: null
  });
  const [value, setValue] = (0, _react.useState)((options || {}).defaultValue || []); // initial effect, we need an un-subscription

  (0, _react.useEffect)(() => {
    return () => (0, _useCall.unsubscribe)(tracker);
  }, []); // on changes, re-subscribe

  (0, _react.useEffect)(() => {
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