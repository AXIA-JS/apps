import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { Detector } from '@substrate/connect';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import store from 'store';
import { WsProvider } from '@axia-js/api';
import { ApiPromise } from '@axia-js/api/promise';
import { deriveMapCache, setDeriveCache } from '@axia-js/api-derive/util';
import { ethereumChains, typesBundle, typesChain } from '@axia-js/apps-config';
import { web3Accounts, web3Enable } from '@axia-js/extension-dapp';
import { TokenUnit } from '@axia-js/react-components/InputNumber';
import { StatusContext } from '@axia-js/react-components/Status';
import ApiSigner from '@axia-js/react-signer/signers/ApiSigner';
import { keyring } from '@axia-js/ui-keyring';
import { settings } from '@axia-js/ui-settings';
import { formatBalance, isTestChain } from '@axia-js/util';
import { defaults as addressDefaults } from '@axia-js/util-crypto/address/defaults';
import ApiContext from "./ApiContext.js";
import registry from "./typeRegistry.js";
import { decodeUrlTypes } from "./urlTypes.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const DEFAULT_DECIMALS = registry.createType('u32', 12);
export const DEFAULT_SS58 = registry.createType('u32', addressDefaults.prefix);
export const DEFAULT_AUX = ['Aux1', 'Aux2', 'Aux3', 'Aux4', 'Aux5', 'Aux6', 'Aux7', 'Aux8', 'Aux9'];
let api;
export { api };

function isKeyringLoaded() {
  try {
    return !!keyring.keyring;
  } catch {
    return false;
  }
}

function getDevTypes() {
  const types = decodeUrlTypes() || store.get('types', {});
  const names = Object.keys(types);
  names.length && console.log('Injected types:', names.join(', '));
  return types;
}

async function getInjectedAccounts(injectedPromise) {
  try {
    await injectedPromise;
    const accounts = await web3Accounts();
    return accounts.map(({
      address,
      meta
    }, whenCreated) => ({
      address,
      meta: _objectSpread(_objectSpread({}, meta), {}, {
        name: `${meta.name || 'unknown'} (${meta.source === 'axia-js' ? 'extension' : meta.source})`,
        whenCreated
      })
    }));
  } catch (error) {
    console.error('web3Accounts', error);
    return [];
  }
}

async function retrieve(api, injectedPromise) {
  var _api$consts$system;

  const [chainProperties, systemChain, systemChainType, systemName, systemVersion, injectedAccounts] = await Promise.all([api.rpc.system.properties(), api.rpc.system.chain(), api.rpc.system.chainType ? api.rpc.system.chainType() : Promise.resolve(registry.createType('ChainType', 'Live')), api.rpc.system.name(), api.rpc.system.version(), getInjectedAccounts(injectedPromise)]);
  return {
    injectedAccounts,
    properties: registry.createType('ChainProperties', {
      ss58Format: ((_api$consts$system = api.consts.system) === null || _api$consts$system === void 0 ? void 0 : _api$consts$system.ss58Prefix) || chainProperties.ss58Format,
      tokenDecimals: chainProperties.tokenDecimals,
      tokenSymbol: chainProperties.tokenSymbol
    }),
    systemChain: (systemChain || '<unknown>').toString(),
    systemChainType,
    systemName: systemName.toString(),
    systemVersion: systemVersion.toString()
  };
}

async function loadOnReady(api, injectedPromise, store, types) {
  registry.register(types);
  const {
    injectedAccounts,
    properties,
    systemChain,
    systemChainType,
    systemName,
    systemVersion
  } = await retrieve(api, injectedPromise);
  const ss58Format = settings.prefix === -1 ? properties.ss58Format.unwrapOr(DEFAULT_SS58).toNumber() : settings.prefix;
  const tokenSymbol = properties.tokenSymbol.unwrapOr([formatBalance.getDefaults().unit, ...DEFAULT_AUX]);
  const tokenDecimals = properties.tokenDecimals.unwrapOr([DEFAULT_DECIMALS]);
  const isEthereum = ethereumChains.includes(api.runtimeVersion.specName.toString());
  const isDevelopment = systemChainType.isDevelopment || systemChainType.isLocal || isTestChain(systemChain);
  console.log(`chain: ${systemChain} (${systemChainType.toString()}), ${JSON.stringify(properties)}`); // explicitly override the ss58Format as specified

  registry.setChainProperties(registry.createType('ChainProperties', {
    ss58Format,
    tokenDecimals,
    tokenSymbol
  })); // first setup the UI helpers

  formatBalance.setDefaults({
    decimals: tokenDecimals.map(b => b.toNumber()),
    unit: tokenSymbol[0].toString()
  });
  TokenUnit.setAbbr(tokenSymbol[0].toString()); // finally load the keyring

  isKeyringLoaded() || keyring.loadAll({
    genesisHash: api.genesisHash,
    isDevelopment,
    ss58Format,
    store,
    type: isEthereum ? 'ethereum' : 'ed25519'
  }, injectedAccounts);
  const defaultSection = Object.keys(api.tx)[0];
  const defaultMethod = Object.keys(api.tx[defaultSection])[0];
  const apiDefaultTx = api.tx[defaultSection][defaultMethod];
  const apiDefaultTxSudo = api.tx.system && api.tx.system.setCode || apiDefaultTx;
  setDeriveCache(api.genesisHash.toHex(), deriveMapCache);
  return {
    apiDefaultTx,
    apiDefaultTxSudo,
    hasInjectedAccounts: injectedAccounts.length !== 0,
    isApiReady: true,
    isDevelopment: isEthereum ? false : isDevelopment,
    isEthereum,
    specName: api.runtimeVersion.specName.toString(),
    specVersion: api.runtimeVersion.specVersion.toString(),
    systemChain,
    systemName,
    systemVersion
  };
}

function Api({
  apiUrl,
  children,
  store
}) {
  const {
    queuePayload,
    queueSetTxStatus
  } = useContext(StatusContext);
  const [state, setState] = useState({
    hasInjectedAccounts: false,
    isApiReady: false
  });
  const [isApiConnected, setIsApiConnected] = useState(false);
  const [isApiInitialized, setIsApiInitialized] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [extensions, setExtensions] = useState();
  const value = useMemo(() => _objectSpread(_objectSpread({}, state), {}, {
    api,
    apiError,
    apiUrl,
    extensions,
    isApiConnected,
    isApiInitialized,
    isWaitingInjected: !extensions
  }), [apiError, extensions, isApiConnected, isApiInitialized, state, apiUrl]); // initial initialization

  useEffect(() => {
    let provider;

    if (apiUrl.startsWith('light://')) {
      const detect = new Detector('axia-js/apps');
      provider = detect.provider(apiUrl.replace('light://substrate-connect/', ''));
      provider.connect().catch(console.error);
    } else {
      provider = new WsProvider(apiUrl);
    }

    const signer = new ApiSigner(registry, queuePayload, queueSetTxStatus);
    const types = getDevTypes();
    api = new ApiPromise({
      provider,
      registry,
      signer,
      types,
      typesBundle,
      typesChain
    });
    api.on('connected', () => setIsApiConnected(true));
    api.on('disconnected', () => setIsApiConnected(false));
    api.on('error', error => setApiError(error.message));
    api.on('ready', () => {
      const injectedPromise = web3Enable('axia-js/apps');
      injectedPromise.then(setExtensions).catch(console.error);
      loadOnReady(api, injectedPromise, store, types).then(setState).catch(error => {
        console.error(error);
        setApiError(error.message);
      });
    });
    setIsApiInitialized(true);
  }, [apiUrl, queuePayload, queueSetTxStatus, store]);

  if (!value.isApiInitialized) {
    return null;
  }

  return /*#__PURE__*/_jsx(ApiContext.Provider, {
    value: value,
    children: children
  });
}

export default /*#__PURE__*/React.memo(Api);