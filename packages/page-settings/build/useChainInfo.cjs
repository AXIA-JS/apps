"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useChainInfo;

var _react = require("react");

var _appsConfig = require("@axia-js/apps-config");

var _reactApi = require("@axia-js/react-api");

var _reactHooks = require("@axia-js/react-hooks");

var _typesKnown = require("@axia-js/types-known");

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useChainInfo() {
  const {
    api,
    isApiReady,
    isEthereum,
    specName,
    systemChain,
    systemName
  } = (0, _reactHooks.useApi)();
  return (0, _react.useMemo)(() => isApiReady ? {
    chain: systemChain,
    chainType: isEthereum ? 'ethereum' : 'substrate',
    color: (0, _appsConfig.getSystemColor)(systemChain, systemName, specName),
    genesisHash: api.genesisHash.toHex(),
    icon: (0, _appsConfig.getSystemIcon)(systemName, specName),
    metaCalls: (0, _utilCrypto.base64Encode)(api.runtimeMetadata.asCallsOnly.toU8a()),
    specVersion: api.runtimeVersion.specVersion.toNumber(),
    ss58Format: (0, _util.isNumber)(api.registry.chainSS58) ? api.registry.chainSS58 : _reactApi.DEFAULT_SS58.toNumber(),
    tokenDecimals: (api.registry.chainDecimals || [_reactApi.DEFAULT_DECIMALS.toNumber()])[0],
    tokenSymbol: (api.registry.chainTokens || _util.formatBalance.getDefaults().unit)[0],
    types: (0, _typesKnown.getSpecTypes)(api.registry, systemChain, api.runtimeVersion.specName, api.runtimeVersion.specVersion)
  } : null, [api, isApiReady, specName, systemChain, systemName, isEthereum]);
}