"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useProxies;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
const EMPTY_STATE = {
  hasOwned: false,
  owned: [],
  proxies: []
};

function createProxy(allAccounts, delegate, type) {
  let delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _util.BN_ZERO;
  const address = delegate.toString();
  return {
    address,
    delay,
    isOwned: allAccounts.includes(address),
    type
  };
}

function useProxies(address) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const mountedRef = (0, _reactHooks.useIsMountedRef)();
  const [known, setState] = (0, _react.useState)(EMPTY_STATE);
  (0, _react.useEffect)(() => {
    setState(EMPTY_STATE);
    address && api.query.proxy && api.query.proxy.proxies(address).then(_ref => {
      let [_proxies] = _ref;
      const proxies = api.tx.proxy.addProxy.meta.args.length === 3 ? _proxies.map(_ref2 => {
        let {
          delay,
          delegate,
          proxyType
        } = _ref2;
        return createProxy(allAccounts, delegate, proxyType, delay);
      }) : _proxies.map(_ref3 => {
        let [delegate, proxyType] = _ref3;
        return createProxy(allAccounts, delegate, proxyType);
      });
      const owned = proxies.filter(_ref4 => {
        let {
          isOwned
        } = _ref4;
        return isOwned;
      });
      mountedRef.current && setState({
        hasOwned: owned.length !== 0,
        owned,
        proxies
      });
    }).catch(console.error);
  }, [allAccounts, api, address, mountedRef]);
  return known;
}