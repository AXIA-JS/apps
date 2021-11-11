"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAssetInfos;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const EMPTY_FLAGS = {
  isAdminMe: false,
  isFreezerMe: false,
  isIssuerMe: false,
  isOwnerMe: false
};
const QUERY_OPTS = {
  withParams: true
};

function isAccount(allAccounts, accountId) {
  const address = accountId.toString();
  return allAccounts.some(a => a === address);
}

function extractInfo(allAccounts, id, optDetails, metadata) {
  const details = optDetails.unwrapOr(null);
  return _objectSpread(_objectSpread({}, details ? {
    isAdminMe: isAccount(allAccounts, details.admin),
    isFreezerMe: isAccount(allAccounts, details.freezer),
    isIssuerMe: isAccount(allAccounts, details.issuer),
    isOwnerMe: isAccount(allAccounts, details.owner)
  } : EMPTY_FLAGS), {}, {
    details,
    id,
    key: id.toString(),
    metadata: metadata.isEmpty ? null : metadata
  });
}

function useAssetInfos(ids) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const metadata = (0, _reactHooks.useCall)(api.query.assets.metadata.multi, [ids], QUERY_OPTS);
  const details = (0, _reactHooks.useCall)(api.query.assets.asset.multi, [ids], QUERY_OPTS);
  const [state, setState] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    details && metadata && details[0][0].length === metadata[0][0].length && setState(details[0][0].map((id, index) => extractInfo(allAccounts, id, details[1][index], metadata[1][index])));
  }, [allAccounts, details, ids, metadata]);
  return state;
}