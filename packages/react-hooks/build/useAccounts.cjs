"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAccounts = useAccounts;

var _react = require("react");

var _uiKeyring = require("@axia-js/ui-keyring");

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _useIsMountedRef = require("./useIsMountedRef.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
const EMPTY = {
  allAccounts: [],
  allAccountsHex: [],
  areAccountsLoaded: false,
  hasAccounts: false,
  isAccount: () => false
};

function useAccounts() {
  const mountedRef = (0, _useIsMountedRef.useIsMountedRef)();
  const [state, setState] = (0, _react.useState)(EMPTY);
  (0, _react.useEffect)(() => {
    const subscription = _uiKeyring.keyring.accounts.subject.subscribe(accounts => {
      if (mountedRef.current) {
        const allAccounts = accounts ? Object.keys(accounts) : [];
        const allAccountsHex = allAccounts.map(a => (0, _util.u8aToHex)((0, _utilCrypto.decodeAddress)(a)));
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