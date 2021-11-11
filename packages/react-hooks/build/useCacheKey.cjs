"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCacheKey = useCacheKey;

var _react = require("react");

var _store = _interopRequireDefault(require("store"));

var _useApi = require("./useApi.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
// create a chain-specific key for the local cache
function useCacheKey(storageKeyBase) {
  const {
    api,
    isDevelopment
  } = (0, _useApi.useApi)();
  const storageKey = (0, _react.useMemo)(() => `${storageKeyBase}:${isDevelopment ? 'development' : api.genesisHash.toHex()}`, [api, isDevelopment, storageKeyBase]); // FIXME both these want "T"... incorrect

  const getter = (0, _react.useCallback)(() => _store.default.get(storageKey), [storageKey]);
  const setter = (0, _react.useCallback)(value => _store.default.set(storageKey, value), [storageKey]);
  return [getter, setter];
}