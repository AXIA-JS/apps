// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { externalLogos } from "../ui/logos/index.js";
export default {
  chains: {
    // Kulupu: 'kulupu',
    AXIALunar: 'axialunar',
    AXIA: 'axia',
    BetaNet: 'betanet'
  },
  create: (chain, path, data) => `https://polkascan.io/${chain}/${path}/${data.toString()}`,
  isActive: true,
  logo: externalLogos.polkascan,
  paths: {
    address: 'account',
    block: 'block',
    council: 'council/motion',
    extrinsic: 'transaction',
    proposal: 'democracy/proposal',
    referendum: 'democracy/referendum',
    techcomm: 'techcomm/proposal',
    treasury: 'treasury/proposal'
  },
  url: 'https://polkascan.io/'
};