import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { AXIALUNAR_GENESIS, NEATCOIN_GENESIS, AXIA_GENESIS } from "../constants.js";
const DEFAULT_PARAMS = {
  auctionAdjust: 0,
  auctionMax: 0,
  falloff: 0.05,
  maxInflation: 0.1,
  minInflation: 0.025,
  stakeTarget: 0.5
};
const KNOWN_PARAMS = {
  [AXIALUNAR_GENESIS]: _objectSpread(_objectSpread({}, DEFAULT_PARAMS), {}, {
    auctionAdjust: 0.3 / 60,
    auctionMax: 60,
    stakeTarget: 0.75
  }),
  [NEATCOIN_GENESIS]: _objectSpread(_objectSpread({}, DEFAULT_PARAMS), {}, {
    stakeTarget: 0.75
  }),
  [AXIA_GENESIS]: _objectSpread(_objectSpread({}, DEFAULT_PARAMS), {}, {
    stakeTarget: 0.75
  })
};
export function getInflationParams(api) {
  return KNOWN_PARAMS[api.genesisHash.toHex()] || DEFAULT_PARAMS;
}