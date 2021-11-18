// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { LinkOption } from './types';

import { createCustom, createDev, createOwn } from './development';
import { createProduction } from './production';
import { createAXIALunarRelay, createAXIARelay } from './productionRelays';
import { createTesting } from './testing';
import { createBetaNetRelay, createAlphaNetRelay } from './testingRelays';

export { CUSTOM_ENDPOINT_KEY } from './development';

export function createWsEndpoints (t: TFunction, firstOnly = false, withSort = true): LinkOption[] {
  return [
    ...createCustom(t),
    {
      isDisabled: false,
      isHeader: true,
      isSpaced: true,
      text: t('rpc.header.axia.relay', 'AXIA & allychains', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createAXIARelay(t, firstOnly, withSort),
    {
      isDisabled: true,
      isHeader: true,
      text: t('rpc.header.axialunar.relay', 'AXIALunar & allychains', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createAXIALunarRelay(t, firstOnly, withSort),
    {
      isDisabled: true,
      isHeader: true,
      isSpaced: true,
      text: t('rpc.header.alphanet.relay', 'Test AlphaNet & allychains', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createAlphaNetRelay(t, firstOnly, withSort),
    {
      isDisabled: true,
      isHeader: true,
      text: t('rpc.header.betanet.relay', 'Test BetaNet & allychains', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createBetaNetRelay(t, firstOnly, withSort),
    {
      isDisabled: false,
      isHeader: true,
      isSpaced: true,
      text: t('rpc.header.live', 'Live networks', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createProduction(t, firstOnly, withSort),
    {
      isDisabled: false,
      isHeader: true,
      text: t('rpc.header.test', 'Test networks', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createTesting(t, firstOnly, withSort),
    {
      isDevelopment: true,
      isDisabled: false,
      isHeader: true,
      isSpaced: true,
      text: t('rpc.header.dev', 'Development', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createDev(t),
    ...createOwn(t)
  ].filter(({ isDisabled }) => !isDisabled);
}
