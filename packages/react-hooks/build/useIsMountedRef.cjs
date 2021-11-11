"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIsMountedRef = useIsMountedRef;

var _react = require("react");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useIsMountedRef() {
  const isMounted = (0, _react.useRef)(false);
  (0, _react.useEffect)(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}