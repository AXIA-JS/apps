"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NEATCOIN_GENESIS = exports.KULUPU_GENESIS = exports.BETANET_GENESIS = exports.AXIA_GENESIS = exports.AXIA_DENOM_BLOCK = exports.AXIALUNAR_GENESIS = exports.ALPHANET_GENESIS = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _networks = require("@axia-js/networks");

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function getGenesis(name) {
  const network = _networks.selectableNetworks.find(_ref => {
    let {
      network
    } = _ref;
    return network === name;
  });

  (0, _util.assert)(network && network.genesisHash[0], `Unable to find genesisHash for ${name}`);
  return network.genesisHash[0];
}

const KULUPU_GENESIS = getGenesis('kulupu');
exports.KULUPU_GENESIS = KULUPU_GENESIS;
const AXIALUNAR_GENESIS = getGenesis('axialunar');
exports.AXIALUNAR_GENESIS = AXIALUNAR_GENESIS;
const AXIA_GENESIS = getGenesis('axia');
exports.AXIA_GENESIS = AXIA_GENESIS;
const AXIA_DENOM_BLOCK = new _bn.default(1248328);
exports.AXIA_DENOM_BLOCK = AXIA_DENOM_BLOCK;
const BETANET_GENESIS = '0x5fce687da39305dfe682b117f0820b319348e8bb37eb16cf34acbf6a202de9d9';
exports.BETANET_GENESIS = BETANET_GENESIS;
const ALPHANET_GENESIS = '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e';
exports.ALPHANET_GENESIS = ALPHANET_GENESIS;
const NEATCOIN_GENESIS = '0xfbb541421d30423c9a753ffa844b64fd44d823f513bf49e3b73b3a656309a595';
exports.NEATCOIN_GENESIS = NEATCOIN_GENESIS;