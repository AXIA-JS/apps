import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2020 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useMemo } from 'react';
import { Ledger } from '@axia-js/hw-ledger';
import { knownGenesis, knownLedger } from '@axia-js/networks/defaults';
import uiSettings from '@axia-js/ui-settings';
import { assert } from '@axia-js/util';
import { useApi } from "./useApi.js";
const EMPTY_STATE = {
  isLedgerCapable: false,
  isLedgerEnabled: false
};
const hasWebUsb = !!window.USB;
const ledgerChains = Object.keys(knownGenesis).filter(n => knownLedger[n]);
const ledgerHashes = ledgerChains.reduce((all, n) => [...all, ...knownGenesis[n]], []);
let ledger = null;
let ledgerType = null;

function retrieveLedger(api) {
  const currType = uiSettings.ledgerConn;

  if (!ledger || ledgerType !== currType) {
    const genesisHex = api.genesisHash.toHex();
    const network = ledgerChains.find(network => knownGenesis[network].includes(genesisHex));
    assert(network, `Unable to find a known Ledger config for genesisHash ${genesisHex}`);
    ledger = new Ledger(currType, network);
    ledgerType = currType;
  }

  return ledger;
}

function getState(api) {
  const isLedgerCapable = hasWebUsb && ledgerHashes.includes(api.genesisHash.toHex());
  return {
    isLedgerCapable,
    isLedgerEnabled: isLedgerCapable && uiSettings.ledgerConn !== 'none'
  };
}

export function useLedger() {
  const {
    api,
    isApiReady
  } = useApi();
  const getLedger = useCallback(() => retrieveLedger(api), [api]);
  return useMemo(() => _objectSpread(_objectSpread({}, isApiReady ? getState(api) : EMPTY_STATE), {}, {
    getLedger
  }), [api, getLedger, isApiReady]);
}