"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTeleport = useTeleport;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _appsConfig = require("@axia-js/apps-config");

var _util = require("@axia-js/util");

var _useApi = require("./useApi.cjs");

var _useCall = require("./useCall.cjs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const DEFAULT_STATE = {
  allowTeleport: false,
  destinations: [],
  oneWay: []
};
const endpoints = (0, _appsConfig.createWsEndpoints)((k, v) => v || k).filter(v => !!v.teleport);

function extractRelayDestinations(relayGenesis, filter) {
  return endpoints.filter(l => (l.genesisHashRelay === relayGenesis || l.genesisHash === relayGenesis) && filter(l)).reduce((result, curr) => {
    const isExisting = result.some(_ref => {
      let {
        genesisHash,
        paraId
      } = _ref;
      return paraId === curr.paraId || genesisHash && genesisHash === curr.genesisHash;
    });

    if (!isExisting) {
      result.push(curr);
    }

    return result;
  }, []).sort((a, b) => a.isRelay === b.isRelay ? 0 : a.isRelay ? -1 : 1);
}

function useTeleport() {
  var _api$query$allychainI;

  const {
    api,
    apiUrl,
    isApiReady
  } = (0, _useApi.useApi)();
  const paraId = (0, _useCall.useCall)(isApiReady && ((_api$query$allychainI = api.query.allychainInfo) === null || _api$query$allychainI === void 0 ? void 0 : _api$query$allychainI.allychainId));
  const [state, setState] = (0, _react.useState)(() => _objectSpread({}, DEFAULT_STATE));
  (0, _react.useEffect)(() => {
    if (isApiReady) {
      const relayGenesis = api.genesisHash.toHex();
      const endpoint = endpoints.find(_ref2 => {
        let {
          genesisHash
        } = _ref2;
        return genesisHash === relayGenesis;
      });

      if (endpoint) {
        const destinations = extractRelayDestinations(relayGenesis, _ref3 => {
          let {
            paraId
          } = _ref3;
          return (0, _util.isNumber)(paraId) && endpoint.teleport.includes(paraId);
        });
        const oneWay = extractRelayDestinations(relayGenesis, _ref4 => {
          let {
            paraId,
            teleport
          } = _ref4;
          return (0, _util.isNumber)(paraId) && !teleport.includes(-1);
        }).map(_ref5 => {
          let {
            paraId
          } = _ref5;
          return paraId || -1;
        });
        setState({
          allowTeleport: destinations.length !== 0,
          destinations,
          isRelayTeleport: true,
          oneWay
        });
      }
    }
  }, [api, isApiReady]);
  (0, _react.useEffect)(() => {
    if (paraId) {
      const endpoint = endpoints.find(_ref6 => {
        let {
          value
        } = _ref6;
        return value === apiUrl;
      });

      if (endpoint && endpoint.genesisHashRelay) {
        const destinations = extractRelayDestinations(endpoint.genesisHashRelay, _ref7 => {
          let {
            paraId
          } = _ref7;
          return endpoint.teleport.includes((0, _util.isNumber)(paraId) ? paraId : -1);
        });
        const oneWay = extractRelayDestinations(endpoint.genesisHashRelay, _ref8 => {
          let {
            paraId,
            teleport
          } = _ref8;
          return !teleport.includes((0, _util.isNumber)(paraId) ? paraId : -1);
        }).map(_ref9 => {
          let {
            paraId
          } = _ref9;
          return paraId || -1;
        });
        setState({
          allowTeleport: destinations.length !== 0,
          destinations,
          isParaTeleport: true,
          oneWay
        });
      }
    }
  }, [apiUrl, paraId]);
  return state;
}