"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useContracts = useContracts;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

var _uiKeyring = require("@axia-js/ui-keyring");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_STATE = {
  allContracts: [],
  hasContracts: false,
  isContract: () => false
};

function useContracts() {
  const mountedRef = (0, _reactHooks.useIsMountedRef)();
  const [state, setState] = (0, _react.useState)(DEFAULT_STATE);
  (0, _react.useEffect)(() => {
    const subscription = _uiKeyring.keyring.contracts.subject.subscribe(contracts => {
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