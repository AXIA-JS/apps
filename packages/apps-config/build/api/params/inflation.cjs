"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInflationParams = getInflationParams;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _constants = require("../constants.cjs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const DEFAULT_PARAMS = {
  auctionAdjust: 0,
  auctionMax: 0,
  falloff: 0.05,
  maxInflation: 0.1,
  minInflation: 0.025,
  stakeTarget: 0.5
};
const KNOWN_PARAMS = {
  [_constants.AXIALUNAR_GENESIS]: _objectSpread(_objectSpread({}, DEFAULT_PARAMS), {}, {
    auctionAdjust: 0.3 / 60,
    auctionMax: 60,
    stakeTarget: 0.75
  }),
  [_constants.NEATCOIN_GENESIS]: _objectSpread(_objectSpread({}, DEFAULT_PARAMS), {}, {
    stakeTarget: 0.75
  }),
  [_constants.AXIASOLAR_GENESIS]: _objectSpread(_objectSpread({}, DEFAULT_PARAMS), {}, {
    stakeTarget: 0.75
  })
};

function getInflationParams(api) {
  return KNOWN_PARAMS[api.genesisHash.toHex()] || DEFAULT_PARAMS;
}