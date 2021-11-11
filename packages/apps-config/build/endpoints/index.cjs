"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWsEndpoints = createWsEndpoints;
Object.defineProperty(exports, "CUSTOM_ENDPOINT_KEY", {
  enumerable: true,
  get: function () {
    return _development.CUSTOM_ENDPOINT_KEY;
  }
});

var _development = require("./development.cjs");

var _production = require("./production.cjs");

var _productionRelays = require("./productionRelays.cjs");

var _testing = require("./testing.cjs");

var _testingRelays = require("./testingRelays.cjs");

// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createWsEndpoints(t, firstOnly = false, withSort = true) {
  return [...(0, _development.createCustom)(t), {
    isDisabled: false,
    isHeader: true,
    isSpaced: true,
    text: t('rpc.header.axia.relay', 'AXIA & parachains', {
      ns: 'apps-config'
    }),
    textBy: '',
    value: ''
  }, ...(0, _productionRelays.createAXIARelay)(t, firstOnly, withSort), {
    isDisabled: false,
    isHeader: true,
    text: t('rpc.header.axialunar.relay', 'AXIALunar & parachains', {
      ns: 'apps-config'
    }),
    textBy: '',
    value: ''
  }, ...(0, _productionRelays.createAXIALunarRelay)(t, firstOnly, withSort), {
    isDisabled: false,
    isHeader: true,
    isSpaced: true,
    text: t('rpc.header.alphanet.relay', 'Test AlphaNet & parachains', {
      ns: 'apps-config'
    }),
    textBy: '',
    value: ''
  }, ...(0, _testingRelays.createAlphaNetRelay)(t, firstOnly, withSort), {
    isDisabled: false,
    isHeader: true,
    text: t('rpc.header.betanet.relay', 'Test BetaNet & parachains', {
      ns: 'apps-config'
    }),
    textBy: '',
    value: ''
  }, ...(0, _testingRelays.createBetaNetRelay)(t, firstOnly, withSort), {
    isDisabled: false,
    isHeader: true,
    isSpaced: true,
    text: t('rpc.header.live', 'Live networks', {
      ns: 'apps-config'
    }),
    textBy: '',
    value: ''
  }, ...(0, _production.createProduction)(t, firstOnly, withSort), {
    isDisabled: false,
    isHeader: true,
    text: t('rpc.header.test', 'Test networks', {
      ns: 'apps-config'
    }),
    textBy: '',
    value: ''
  }, ...(0, _testing.createTesting)(t, firstOnly, withSort), {
    isDevelopment: true,
    isDisabled: false,
    isHeader: true,
    isSpaced: true,
    text: t('rpc.header.dev', 'Development', {
      ns: 'apps-config'
    }),
    textBy: '',
    value: ''
  }, ...(0, _development.createDev)(t), ...(0, _development.createOwn)(t)].filter(({
    isDisabled
  }) => !isDisabled);
}