// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useState } from 'react';
export function useAccountId(initialValue = null, onChangeAccountId) {
  const [accountId, setAccountId] = useState(initialValue);

  const _setAccountId = useCallback((accountId = null) => {
    setAccountId(accountId);
    onChangeAccountId && onChangeAccountId(accountId);
  }, [onChangeAccountId]);

  return [accountId, _setAccountId];
}