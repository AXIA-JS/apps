// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { keyring } from '@axia-js/ui-keyring';
import { useIsMountedRef } from "./useIsMountedRef.js";
export function useAddresses() {
  const mountedRef = useIsMountedRef();
  const [state, setState] = useState({
    allAddresses: [],
    hasAddresses: false,
    isAddress: () => false
  });
  useEffect(() => {
    const subscription = keyring.addresses.subject.subscribe(addresses => {
      if (mountedRef.current) {
        const allAddresses = addresses ? Object.keys(addresses) : [];
        const hasAddresses = allAddresses.length !== 0;

        const isAddress = address => allAddresses.includes(address.toString());

        setState({
          allAddresses,
          hasAddresses,
          isAddress
        });
      }
    });
    return () => {
      setTimeout(() => subscription.unsubscribe(), 0);
    };
  }, [mountedRef]);
  return state;
}