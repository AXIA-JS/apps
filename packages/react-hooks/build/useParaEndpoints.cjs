"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIsParasLinked = useIsParasLinked;
exports.useParaEndpoints = useParaEndpoints;
exports.useRelayEndpoints = useRelayEndpoints;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _appsConfig = require("@axia-js/apps-config");

var _util = require("@axia-js/util");

var _useApi = require("./useApi.cjs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const endpoints = (0, _appsConfig.createWsEndpoints)((key, value) => value || key);

function extractRelayEndpoints(genesisHash) {
  return endpoints.filter(_ref => {
    let {
      genesisHashRelay
    } = _ref;
    return genesisHash === genesisHashRelay;
  });
}

function extractParaEndpoints(allEndpoints, paraId) {
  const numId = (0, _util.bnToBn)(paraId).toNumber();
  return allEndpoints.filter(_ref2 => {
    let {
      paraId
    } = _ref2;
    return paraId === numId;
  });
}

function useRelayEndpoints() {
  const {
    api
  } = (0, _useApi.useApi)();
  return (0, _react.useMemo)(() => extractRelayEndpoints(api.genesisHash.toHex()), [api]);
}

function useParaEndpoints(paraId) {
  const endpoints = useRelayEndpoints();
  return (0, _react.useMemo)(() => extractParaEndpoints(endpoints, paraId), [endpoints, paraId]);
}

function useIsParasLinked(ids) {
  const endpoints = useRelayEndpoints();
  return (0, _react.useMemo)(() => ids ? ids.reduce((all, id) => _objectSpread(_objectSpread({}, all), {}, {
    [id.toString()]: extractParaEndpoints(endpoints, id).length !== 0
  }), {}) : {}, [endpoints, ids]);
}