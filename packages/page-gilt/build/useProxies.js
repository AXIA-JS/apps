import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useAccounts, useApi, useIsMountedRef } from '@axia-js/react-hooks';
export function useProxies() {
  const {
    api
  } = useApi();
  const {
    allAccounts
  } = useAccounts();
  const mountedRef = useIsMountedRef();
  const [state, setState] = useState({});
  useEffect(() => {
    if (allAccounts.length) {
      api.query.proxy.proxies.multi(allAccounts).then(result => mountedRef.current && setState(result.map(([p], index) => [allAccounts[index], p.map(({
        delegate
      }) => delegate.toString())]).filter(([, p]) => p.length).reduce((all, [a, p]) => _objectSpread(_objectSpread({}, all), {}, {
        [a]: p
      }), {}))).catch(console.error);
    }
  }, [allAccounts, api, mountedRef]);
  return state;
}