// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { keyring } from '@axia-js/ui-keyring';
import { u8aToHex } from '@axia-js/util';
import { decodeAddress } from '@axia-js/util-crypto';
import { useIsMountedRef } from "./useIsMountedRef.js";
const EMPTY = {
  allAccounts: [],
  allAccountsHex: [],
  areAccountsLoaded: false,
  hasAccounts: false,
  isAccount: () => false
};
export function useAccounts() {
  const mountedRef = useIsMountedRef();
  const [state, setState] = useState(EMPTY);
  useEffect(() => {
    const subscription = keyring.accounts.subject.subscribe(accounts => {
      if (mountedRef.current) {
        const allAccounts = accounts ? Object.keys(accounts) : [];
        const allAccountsHex = allAccounts.map(a => u8aToHex(decodeAddress(a)));
        const hasAccounts = allAccounts.length !== 0;

        const isAccount = address => !!address && allAccounts.includes(address);

        setState({
          allAccounts,
          allAccountsHex,
          areAccountsLoaded: true,
          hasAccounts,
          isAccount
        });
      }
    });
    return () => {
      setTimeout(() => subscription.unsubscribe(), 0);
    };
  }, [mountedRef]);
  return state;
}