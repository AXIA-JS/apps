// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useIsMountedRef } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
const DEFAULT_STATE = {
  allContracts: [],
  hasContracts: false,
  isContract: () => false
};
export function useContracts() {
  const mountedRef = useIsMountedRef();
  const [state, setState] = useState(DEFAULT_STATE);
  useEffect(() => {
    const subscription = keyring.contracts.subject.subscribe(contracts => {
      if (mountedRef.current) {
        const allContracts = contracts ? Object.keys(contracts) : [];
        const hasContracts = allContracts.length !== 0;

        const isContract = address => allContracts.includes(address);

        setState({
          allContracts,
          hasContracts,
          isContract
        });
      }
    });
    return () => {
      setTimeout(() => subscription.unsubscribe(), 0);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return state;
}