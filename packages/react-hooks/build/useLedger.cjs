"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLedger = useLedger;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _hwLedger = require("@axia-js/hw-ledger");

var _defaults = require("@axia-js/networks/defaults");

var _uiSettings = _interopRequireDefault(require("@axia-js/ui-settings"));

var _util = require("@axia-js/util");

var _useApi = require("./useApi.cjs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const EMPTY_STATE = {
  isLedgerCapable: false,
  isLedgerEnabled: false
};
const hasWebUsb = !!window.USB;
const ledgerChains = Object.keys(_defaults.knownGenesis).filter(n => _defaults.knownLedger[n]);
const ledgerHashes = ledgerChains.reduce((all, n) => [...all, ..._defaults.knownGenesis[n]], []);
let ledger = null;
let ledgerType = null;

function retrieveLedger(api) {
  const currType = _uiSettings.default.ledgerConn;

  if (!ledger || ledgerType !== currType) {
    const genesisHex = api.genesisHash.toHex();
    const network = ledgerChains.find(network => _defaults.knownGenesis[network].includes(genesisHex));
    (0, _util.assert)(network, `Unable to find a known Ledger config for genesisHash ${genesisHex}`);
    ledger = new _hwLedger.Ledger(currType, network);
    ledgerType = currType;
  }

  return ledger;
}

function getState(api) {
  const isLedgerCapable = hasWebUsb && ledgerHashes.includes(api.genesisHash.toHex());
  return {
    isLedgerCapable,
    isLedgerEnabled: isLedgerCapable && _uiSettings.default.ledgerConn !== 'none'
  };
}

function useLedger() {
  const {
    api,
    isApiReady
  } = (0, _useApi.useApi)();
  const getLedger = (0, _react.useCallback)(() => retrieveLedger(api), [api]);
  return (0, _react.useMemo)(() => _objectSpread(_objectSpread({}, isApiReady ? getState(api) : EMPTY_STATE), {}, {
    getLedger
  }), [api, getLedger, isApiReady]);
}