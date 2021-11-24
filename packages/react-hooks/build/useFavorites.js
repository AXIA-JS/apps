// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useState } from 'react';
import { useCacheKey } from "./useCacheKey.js"; // hook for favorites with local storage

export function useFavorites(storageKeyBase) {
  const [getCache, setCache] = useCacheKey(storageKeyBase);
  const [favorites, setFavorites] = useState(() => getCache() || []);
  const toggleFavorite = useCallback(address => setFavorites(favorites => setCache(favorites.includes(address) ? favorites.filter(accountId => address !== accountId) : [...favorites, address])), [setCache]);
  return [favorites, toggleFavorite];
}