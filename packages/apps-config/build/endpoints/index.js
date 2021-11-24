// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { createCustom, createDev, createOwn } from "./development.js";
import { createProduction } from "./production.js";
import { createAXIALunarRelay, createAXIARelay } from "./productionRelays.js";
import { createTesting } from "./testing.js";
import { createBetaNetRelay, createAlphaNetRelay } from "./testingRelays.js";
export { CUSTOM_ENDPOINT_KEY } from "./development.js";
export function createWsEndpoints(t, firstOnly = false, withSort = true) {
  return [...createCustom(t), {
    isDisabled: false,
    isHeader: true,
    isSpaced: true,
    text: t('rpc.header.axia.relay', 'AXIA & allychains', {
      ns: 'apps-config'
    }),
    textBy: '',
    value: ''
  }, ...createAXIARelay(t, firstOnly, withSort), {
    isDisabled: true,
    isHeader: true,
    text: t('rpc.header.axialunar.relay', 'AXIALunar & allychains', {
      ns: 'apps-config'
    }),
    textBy: '',
    value: ''
  }, ...createAXIALunarRelay(t, firstOnly, withSort), {
    isDisabled: true,
    isHeader: true,
    isSpaced: true,
    text: t('rpc.header.alphanet.relay', 'Test AlphaNet & allychains', {
      ns: 'apps-config'
    }),
    textBy: '',
    value: ''
  }, ...createAlphaNetRelay(t, firstOnly, withSort), {
    isDisabled: true,
    isHeader: true,
    text: t('rpc.header.betanet.relay', 'Test BetaNet & allychains', {
      ns: 'apps-config'
    }),
    textBy: '',
    value: ''
  }, ...createBetaNetRelay(t, firstOnly, withSort), {
    isDisabled: false,
    isHeader: true,
    isSpaced: true,
    text: t('rpc.header.live', 'Live networks', {
      ns: 'apps-config'
    }),
    textBy: '',
    value: ''
  }, ...createProduction(t, firstOnly, withSort), {
    isDisabled: false,
    isHeader: true,
    text: t('rpc.header.test', 'Test networks', {
      ns: 'apps-config'
    }),
    textBy: '',
    value: ''
  }, ...createTesting(t, firstOnly, withSort), {
    isDevelopment: true,
    isDisabled: false,
    isHeader: true,
    isSpaced: true,
    text: t('rpc.header.dev', 'Development', {
      ns: 'apps-config'
    }),
    textBy: '',
    value: ''
  }, ...createDev(t), ...createOwn(t)].filter(({
    isDisabled
  }) => !isDisabled);
}