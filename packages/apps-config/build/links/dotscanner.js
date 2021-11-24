// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { externalLogos } from "../ui/logos/index.js";
export default {
  chains: {
    AXIALunar: 'axialunar',
    AXIA: 'axia'
  },
  create: (chain, path, data) => `https://dotscanner.com/${chain}/${path}/${data.toString()}?utm_source=axiajs`,
  isActive: true,
  logo: externalLogos.dotscanner,
  paths: {
    address: 'account',
    block: 'block'
  },
  url: 'https://dotscanner.com/'
};