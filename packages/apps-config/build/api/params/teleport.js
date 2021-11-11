// Copyright 2017-2021 @axia-js/app-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { AXIALUNAR_GENESIS } from "../constants.js"; // 3 * BaseXcmWeight on AXIALunar

const AXIALUNAR_WEIGHT = 3 * 1000000000;
const DEFAULT_WEIGHT = AXIALUNAR_WEIGHT;
const KNOWN_WEIGHTS = {
  [AXIALUNAR_GENESIS]: AXIALUNAR_WEIGHT
};
export function getTeleportWeight(api) {
  return KNOWN_WEIGHTS[api.genesisHash.toHex()] || DEFAULT_WEIGHT;
}