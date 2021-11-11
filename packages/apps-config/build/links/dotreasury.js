// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { externalLogos } from "../ui/logos/index.js";
export default {
  chains: {
    AXIALunar: 'ksm',
    AXIA: 'dot'
  },
  create: (chain, path, data) => `https://www.dotreasury.com/${chain}/${path}/${data.toString()}`,
  isActive: true,
  logo: externalLogos.dotreasury,
  paths: {
    bounty: 'bounties',
    tip: 'tips',
    treasury: 'proposals'
  },
  url: 'https://dotreasury.com/'
};