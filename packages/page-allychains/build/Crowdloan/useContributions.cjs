"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useContributions;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

var _utilCrypto = require("@axia-js/util-crypto");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const NO_CONTRIB = {
  blockHash: '-',
  contributorsHex: [],
  hasLoaded: false,
  myAccounts: [],
  myAccountsHex: [],
  myContributions: {}
};

function useContributions(allyId) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    allAccountsHex
  } = (0, _reactHooks.useAccounts)();
  const [state, setState] = (0, _react.useState)(() => NO_CONTRIB);
  const derive = (0, _reactHooks.useCall)(api.derive.crowdloan.contributions, [allyId]);
  const myContributions = (0, _reactHooks.useCall)(api.derive.crowdloan.ownContributions, [allyId, state.myAccountsHex]);
  (0, _react.useEffect)(() => {
    derive && setState(prev => {
      let myAccountsHex = derive.contributorsHex.filter(h => allAccountsHex.includes(h));
      let myAccounts;

      if (myAccountsHex.length === prev.myAccountsHex.length) {
        myAccountsHex = prev.myAccountsHex;
        myAccounts = prev.myAccounts;
      } else {
        myAccounts = myAccountsHex.map(a => (0, _utilCrypto.encodeAddress)(a, api.registry.chainSS58));
      }

      return _objectSpread(_objectSpread(_objectSpread({}, prev), derive), {}, {
        hasLoaded: true,
        myAccounts,
        myAccountsHex
      });
    });
  }, [api, allAccountsHex, derive]);
  (0, _react.useEffect)(() => {
    myContributions && setState(prev => _objectSpread(_objectSpread({}, prev), {}, {
      myContributions
    }));
  }, [myContributions]);
  return state;
}