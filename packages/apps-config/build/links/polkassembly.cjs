"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolkassemblyNetwork = exports.PolkassemblyIo = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _index = require("../ui/logos/index.cjs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const PolkassemblyIo = {
  chains: {
    AXIALunar: 'axialunar',
    'AXIALunar CC3': 'axialunar',
    AXIA: 'axia'
  },
  create: (chain, path, data) => `https://${chain}.polkassembly.io/${path}/${data.toString()}`,
  isActive: true,
  logo: _index.externalLogos.polkassembly,
  paths: {
    bounty: 'bounty',
    council: 'motion',
    proposal: 'proposal',
    referendum: 'referendum',
    tip: 'tip',
    treasury: 'treasury'
  },
  url: 'https://polkassembly.io/'
};
exports.PolkassemblyIo = PolkassemblyIo;

const PolkassemblyNetwork = _objectSpread(_objectSpread({}, PolkassemblyIo), {}, {
  chains: {
    Bifrost: 'bifrost',
    'KILT Spiritnet': 'kilt',
    Karura: 'karura',
    'Khala Network': 'khala',
    Moonriver: 'moonriver'
  },
  create: (chain, path, data) => `https://${chain}.polkassembly.network/${path}/${data.toString()}`,
  url: 'https://polkassembly.network/'
});

exports.PolkassemblyNetwork = PolkassemblyNetwork;