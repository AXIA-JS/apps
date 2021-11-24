"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../ui/logos/index.cjs");

// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
var _default = {
  chains: {
    'Acala Mandala TC5': 'acala-testnet',
    'Bifrost Asgard Nightly': 'bifrost',
    'Centrifuge Mainnet': 'centrifuge',
    ChainX: 'chainx',
    'Crust Maxwell': 'crust',
    'Darwinia CC1': 'darwinia-cc1',
    'Darwinia Crab': 'crab',
    Edgeware: 'edgeware',
    Equilibrium: 'equilibrium',
    'KILT Peregrine': 'kilt-testnet',
    'KILT Spiritnet': 'spiritnet',
    Karura: 'karura',
    Kulupu: 'kulupu',
    AXIALunar: 'axialunar',
    'Laminar Turbulence TC2': 'laminar-testnet',
    'Phala PoC-4': 'phala',
    Plasm: 'plasm',
    AXIA: 'axia',
    BetaNet: 'betanet',
    Shiden: 'shiden',
    Stafi: 'stafi',
    AlphaNet: 'alphanet'
  },
  create: (chain, path, data) => `https://${chain}.subscan.io/${path}/${data.toString()}`,
  isActive: true,
  logo: _index.externalLogos.subscan,
  paths: {
    address: 'account',
    block: 'block',
    council: 'council',
    extrinsic: 'extrinsic',
    proposal: 'democracy_proposal',
    referendum: 'referenda',
    techcomm: 'tech',
    treasury: 'treasury'
  },
  url: 'https://subscan.io/'
};
exports.default = _default;