// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useEffect, useState } from 'react';
import { useIsMountedRef } from "./useIsMountedRef.js"; // Simple wrapper for a true/false toggle

export function useToggle(defaultValue = false, onToggle) {
  const mountedRef = useIsMountedRef();
  const [isActive, setActive] = useState(defaultValue);

  const _toggleActive = useCallback(() => {
    mountedRef.current && setActive(isActive => !isActive);
  }, [mountedRef]);

  const _setActive = useCallback(isActive => {
    mountedRef.current && setActive(isActive);
  }, [mountedRef]);

  useEffect(() => onToggle && onToggle(isActive), [isActive, onToggle]);
  return [isActive, _toggleActive, _setActive];
}