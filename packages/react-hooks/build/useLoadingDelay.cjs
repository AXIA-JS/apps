"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLoadingDelay = useLoadingDelay;

var _react = require("react");

var _useIsMountedRef = require("./useIsMountedRef.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useLoadingDelay(delay = 100) {
  const mountedRef = (0, _useIsMountedRef.useIsMountedRef)();
  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    setTimeout(() => {
      mountedRef.current && setIsLoading(false);
    }, delay); // Ignore, this is for the initial setup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isLoading;
}