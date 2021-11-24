// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useIsMountedRef } from "./useIsMountedRef.js";
const DEFAULT_DELAY = 250; // Debounces inputs

export function useDebounce(value, delay) {
  const mountedRef = useIsMountedRef();
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      mountedRef.current && setDebouncedValue(value);
    }, delay || DEFAULT_DELAY); // each time it renders, it clears

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value, mountedRef]);
  return debouncedValue;
}