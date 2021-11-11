"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAbi;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _apiContract = require("@axia-js/api-contract");

var _reactApi = require("@axia-js/react-api");

var _util = require("@axia-js/util");

var _store = _interopRequireDefault(require("./store.cjs"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function fromInitial(initialValue, isRequired) {
  return {
    abi: initialValue[0] || null,
    abiName: null,
    contractAbi: initialValue[1] || null,
    errorText: null,
    isAbiError: false,
    isAbiSupplied: !!initialValue[1],
    isAbiValid: !isRequired || !!initialValue[1]
  };
}

const EMPTY = {
  abi: null,
  abiName: null,
  contractAbi: null,
  errorText: null,
  isAbiError: false,
  isAbiSupplied: false,
  isAbiValid: false
};

function useAbi(initialValue = [null, null], codeHash = null, isRequired = false) {
  const [state, setAbi] = (0, _react.useState)(() => fromInitial(initialValue, isRequired));
  (0, _react.useEffect)(() => setAbi(state => initialValue[0] && state.abi !== initialValue[0] ? fromInitial(initialValue, isRequired) : state), [initialValue, isRequired]);
  const onChangeAbi = (0, _react.useCallback)((u8a, name) => {
    const json = (0, _util.u8aToString)(u8a);

    try {
      setAbi({
        abi: json,
        abiName: name.replace('.contract', '').replace('.json', '').replace('_', ' '),
        contractAbi: new _apiContract.Abi(json, _reactApi.api.registry.getChainProperties()),
        errorText: null,
        isAbiError: false,
        isAbiSupplied: true,
        isAbiValid: true
      });
      codeHash && _store.default.saveCode(codeHash, {
        abi: json
      });
    } catch (error) {
      console.error(error);
      setAbi(_objectSpread(_objectSpread({}, EMPTY), {}, {
        errorText: error.message
      }));
    }
  }, [codeHash]);
  const onRemoveAbi = (0, _react.useCallback)(() => {
    setAbi(EMPTY);
    codeHash && _store.default.saveCode(codeHash, {
      abi: null
    });
  }, [codeHash]);
  return _objectSpread(_objectSpread({}, state), {}, {
    onChangeAbi,
    onRemoveAbi
  });
}