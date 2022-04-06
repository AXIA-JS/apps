import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useAccounts, useApi, useCall } from '@axia-js/react-hooks';
import { encodeAddress } from '@axia-js/util-crypto';
const NO_CONTRIB = {
  blockHash: '-',
  contributorsHex: [],
  hasLoaded: false,
  myAccounts: [],
  myAccountsHex: [],
  myContributions: {}
};
export default function useContributions(allyId) {
  const {
    api
  } = useApi();
  const {
    allAccountsHex
  } = useAccounts();
  const [state, setState] = useState(() => NO_CONTRIB);
  const derive = useCall(api.derive.crowdloan.contributions, [allyId]);
  const myContributions = useCall(api.derive.crowdloan.ownContributions, [allyId, state.myAccountsHex]);
  useEffect(() => {
    derive && setState(prev => {
      let myAccountsHex = derive.contributorsHex.filter(h => allAccountsHex.includes(h));
      let myAccounts;

      if (myAccountsHex.length === prev.myAccountsHex.length) {
        myAccountsHex = prev.myAccountsHex;
        myAccounts = prev.myAccounts;
      } else {
        myAccounts = myAccountsHex.map(a => encodeAddress(a, api.registry.chainSS58));
      }

      return _objectSpread(_objectSpread(_objectSpread({}, prev), derive), {}, {
        hasLoaded: true,
        myAccounts,
        myAccountsHex
      });
    });
  }, [api, allAccountsHex, derive]);
  useEffect(() => {
    myContributions && setState(prev => _objectSpread(_objectSpread({}, prev), {}, {
      myContributions
    }));
  }, [myContributions]);
  return state;
}