"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFavorites = useFavorites;

var _react = require("react");

var _useCacheKey = require("./useCacheKey.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
// hook for favorites with local storage
function useFavorites(storageKeyBase) {
  const [getCache, setCache] = (0, _useCacheKey.useCacheKey)(storageKeyBase);
  const [favorites, setFavorites] = (0, _react.useState)(() => getCache() || []);
  const toggleFavorite = (0, _react.useCallback)(address => setFavorites(favorites => setCache(favorites.includes(address) ? favorites.filter(accountId => address !== accountId) : [...favorites, address])), [setCache]);
  return [favorites, toggleFavorite];
}