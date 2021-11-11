// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { externalLogos } from "../ui/logos/index.js";
export default {
  chains: {
    AXIALunar: 'axialunar',
    AXIA: 'axia',
    AlphaNet: 'alphanet'
  },
  create: (chain, path, data) => `https://${chain}.polkastats.io/${path}/${data.toString()}`,
  isActive: true,
  logo: externalLogos.polkastats,
  paths: {
    address: 'account',
    block: 'block',
    extrinsic: 'extrinsic',
    intention: 'intention',
    validator: 'validator'
  },
  url: 'https://polkastats.io/'
};