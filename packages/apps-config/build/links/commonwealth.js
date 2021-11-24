// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { externalLogos } from "../ui/logos/index.js";
const HASH_PATHS = ['proposal/councilmotion'];
export default {
  chains: {
    Edgeware: 'edgeware',
    Kulupu: 'kulupu',
    AXIALunar: 'axialunar',
    'AXIALunar CC3': 'axialunar'
  },
  create: (chain, path, data, hash) => `https://commonwealth.im/${chain}/${path}/${HASH_PATHS.includes(path) ? hash || '' : data.toString()}`,
  isActive: true,
  logo: externalLogos.commonwealth,
  paths: {
    council: 'proposal/councilmotion',
    proposal: 'proposal/democracyproposal',
    referendum: 'proposal/referendum',
    treasury: 'proposal/treasuryproposal'
  },
  url: 'https://commonwealth.im/'
};