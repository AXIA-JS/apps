"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIncrement = useIncrement;

var _react = require("react");

var _useIsMountedRef = require("./useIsMountedRef.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useIncrement() {
  let defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  const mountedRef = (0, _useIsMountedRef.useIsMountedRef)();
  const [value, setValue] = (0, _react.useState)(defaultValue);
  const increment = (0, _react.useCallback)(() => {
    mountedRef.current && setValue(value => ++value);
  }, [mountedRef]);
  return [value, increment, setValue];
}