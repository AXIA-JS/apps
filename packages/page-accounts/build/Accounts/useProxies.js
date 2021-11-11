// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useAccounts, useApi, useIsMountedRef } from '@axia-js/react-hooks';
import { BN_ZERO } from '@axia-js/util';
const EMPTY_STATE = {
  hasOwned: false,
  owned: [],
  proxies: []
};

function createProxy(allAccounts, delegate, type, delay = BN_ZERO) {
  const address = delegate.toString();
  return {
    address,
    delay,
    isOwned: allAccounts.includes(address),
    type
  };
}

export default function useProxies(address) {
  const {
    api
  } = useApi();
  const {
    allAccounts
  } = useAccounts();
  const mountedRef = useIsMountedRef();
  const [known, setState] = useState(EMPTY_STATE);
  useEffect(() => {
    setState(EMPTY_STATE);
    address && api.query.proxy && api.query.proxy.proxies(address).then(([_proxies]) => {
      const proxies = api.tx.proxy.addProxy.meta.args.length === 3 ? _proxies.map(({
        delay,
        delegate,
        proxyType
      }) => createProxy(allAccounts, delegate, proxyType, delay)) : _proxies.map(([delegate, proxyType]) => createProxy(allAccounts, delegate, proxyType));
      const owned = proxies.filter(({
        isOwned
      }) => isOwned);
      mountedRef.current && setState({
        hasOwned: owned.length !== 0,
        owned,
        proxies
      });
    }).catch(console.error);
  }, [allAccounts, api, address, mountedRef]);
  return known;
}