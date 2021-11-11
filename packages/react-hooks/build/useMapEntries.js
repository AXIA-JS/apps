// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
export function useMapEntries(entry, {
  at,
  transform
} = {}) {
  const [state, setState] = useState();
  useEffect(() => {
    entry && (at && at !== '0' ? entry.entriesAt(at) : entry.entries()).then(entries => setState(transform ? transform(entries) : entries)).catch(console.error);
  }, [at, entry, transform]);
  return state;
}