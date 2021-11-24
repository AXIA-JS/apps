"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTeleportWeight = getTeleportWeight;

var _constants = require("../constants.cjs");

// Copyright 2017-2021 @axia-js/app-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
// 3 * BaseXcmWeight on AXIALunar
const AXIALUNAR_WEIGHT = 3 * 1000000000;
const DEFAULT_WEIGHT = AXIALUNAR_WEIGHT;
const KNOWN_WEIGHTS = {
  [_constants.AXIALUNAR_GENESIS]: AXIALUNAR_WEIGHT
};

function getTeleportWeight(api) {
  return KNOWN_WEIGHTS[api.genesisHash.toHex()] || DEFAULT_WEIGHT;
}