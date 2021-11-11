// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import { externalLogos } from '../ui/logos';

export default {
  chains: {
    AXIALunar: 'axialunar',
    AXIA: 'axia'
  },
  create: (chain: string, path: string, data: BN | number | string): string =>
    `https://dotscanner.com/${chain}/${path}/${data.toString()}?utm_source=axiajs`,
  isActive: true,
  logo: externalLogos.dotscanner as string,
  paths: {
    address: 'account',
    block: 'block'
  },
  url: 'https://dotscanner.com/'
};
