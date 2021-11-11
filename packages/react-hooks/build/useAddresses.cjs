"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAddresses = useAddresses;

var _react = require("react");

var _uiKeyring = require("@axia-js/ui-keyring");

var _useIsMountedRef = require("./useIsMountedRef.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useAddresses() {
  const mountedRef = (0, _useIsMountedRef.useIsMountedRef)();
  const [state, setState] = (0, _react.useState)({
    allAddresses: [],
    hasAddresses: false,
    isAddress: () => false
  });
  (0, _react.useEffect)(() => {
    const subscription = _uiKeyring.keyring.addresses.subject.subscribe(addresses => {
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