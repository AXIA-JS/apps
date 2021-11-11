"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDebounce = useDebounce;

var _react = require("react");

var _useIsMountedRef = require("./useIsMountedRef.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_DELAY = 250; // Debounces inputs

function useDebounce(value, delay) {
  const mountedRef = (0, _useIsMountedRef.useIsMountedRef)();
  const [debouncedValue, setDebouncedValue] = (0, _react.useState)(value);
  (0, _react.useEffect)(() => {
    const handler = setTimeout(() => {
      mountedRef.current && setDebouncedValue(value);
    }, delay || DEFAULT_DELAY); // each time it renders, it clears

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value, mountedRef]);
  return debouncedValue;
}