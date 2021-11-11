"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useProxies = useProxies;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function useProxies() {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const mountedRef = (0, _reactHooks.useIsMountedRef)();
  const [state, setState] = (0, _react.useState)({});
  (0, _react.useEffect)(() => {
    if (allAccounts.length) {
      api.query.proxy.proxies.multi(allAccounts).then(result => mountedRef.current && setState(result.map(([p], index) => [allAccounts[index], p.map(({
        delegate
      }) => delegate.toString())]).filter(([, p]) => p.length).reduce((all, [a, p]) => _objectSpread(_objectSpread({}, all), {}, {
        [a]: p
      }), {}))).catch(console.error);
    }
  }, [allAccounts, api, mountedRef]);
  return state;
}