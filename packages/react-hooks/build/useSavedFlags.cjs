"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSavedFlags = useSavedFlags;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _store = _interopRequireDefault(require("store"));

var _util = require("@axia-js/util");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getInitial(storageKey, initial) {
  const saved = _store.default.get(`flags:${storageKey}`, {});

  return Object.keys(initial).reduce((result, key) => {
    if ((0, _util.isBoolean)(saved[key])) {
      result[key] = saved[key];
    }

    return result;
  }, _objectSpread({}, initial));
}

function getSetters(flags, setFlags) {
  const setFlag = key => value => setFlags(state => _objectSpread(_objectSpread({}, state), {}, {
    [key]: value
  }));

  return Object.keys(flags).reduce((setters, key) => {
    setters[key] = setFlag(key);
    return setters;
  }, {});
}

function useSavedFlags(storageKey, initial) {
  const [flags, setFlags] = (0, _react.useState)(() => getInitial(storageKey, initial));
  const [setters] = (0, _react.useState)(() => getSetters(initial, setFlags));
  (0, _react.useEffect)(() => {
    _store.default.set(`flags:${storageKey}`, flags);
  }, [flags, storageKey]);
  return [flags, setters];
}