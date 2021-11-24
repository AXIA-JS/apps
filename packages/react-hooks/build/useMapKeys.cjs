"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMapKeys = useMapKeys;

var _react = require("react");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useMapKeys(entry) {
  let {
    at,
    transform
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const [state, setState] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    entry && (at && at !== '0' ? entry.keysAt(at) : entry.keys()).then(keys => setState(transform ? transform(keys) : keys)).catch(console.error);
  }, [at, entry, transform]);
  return state;
}