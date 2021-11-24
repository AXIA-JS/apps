// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useState } from 'react';
import { useIsMountedRef } from "./useIsMountedRef.js";
export function useIncrement(defaultValue = 1) {
  const mountedRef = useIsMountedRef();
  const [value, setValue] = useState(defaultValue);
  const increment = useCallback(() => {
    mountedRef.current && setValue(value => ++value);
  }, [mountedRef]);
  return [value, increment, setValue];
}