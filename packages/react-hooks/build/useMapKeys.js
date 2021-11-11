// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
export function useMapKeys(entry, {
  at,
  transform
} = {}) {
  const [state, setState] = useState();
  useEffect(() => {
    entry && (at && at !== '0' ? entry.keysAt(at) : entry.keys()).then(keys => setState(transform ? transform(keys) : keys)).catch(console.error);
  }, [at, entry, transform]);
  return state;
}