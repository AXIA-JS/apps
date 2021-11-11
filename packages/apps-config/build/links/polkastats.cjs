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
    AXIALunar: 'axialunar',
    AXIA: 'axia',
    AlphaNet: 'alphanet'
  },
  create: (chain, path, data) => `https://${chain}.polkastats.io/${path}/${data.toString()}`,
  isActive: true,
  logo: _index.externalLogos.polkastats,
  paths: {
    address: 'account',
    block: 'block',
    extrinsic: 'extrinsic',
    intention: 'intention',
    validator: 'validator'
  },
  url: 'https://polkastats.io/'
};
exports.default = _default;