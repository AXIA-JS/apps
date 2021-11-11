// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import { externalLogos } from '../ui/logos';

export default {
  chains: {
    AXIALunar: 'ksm',
    AXIA: 'dot'
  },
  create: (chain: string, path: string, data: BN | number | string): string =>
    `https://www.dotreasury.com/${chain}/${path}/${data.toString()}`,
  isActive: true,
  logo: externalLogos.dotreasury as string,
  paths: {
    bounty: 'bounties',
    tip: 'tips',
    treasury: 'proposals'
  },
  url: 'https://dotreasury.com/'
};
