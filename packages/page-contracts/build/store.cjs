"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseBase"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseKey"));

var _eventemitter = _interopRequireDefault(require("eventemitter3"));

var _store = _interopRequireDefault(require("store"));

var _apiContract = require("@axia-js/api-contract");

var _reactApi = require("@axia-js/react-api");

var _util = require("@axia-js/util");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const KEY_CODE = 'code:';

var _allCode = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("allCode");

class Store extends _eventemitter.default {
  constructor(...args) {
    super(...args);
    Object.defineProperty(this, _allCode, {
      writable: true,
      value: {}
    });
  }

  get hasCode() {
    return Object.keys((0, _classPrivateFieldLooseBase2.default)(this, _allCode)[_allCode]).length !== 0;
  }

  getAllCode() {
    return Object.values((0, _classPrivateFieldLooseBase2.default)(this, _allCode)[_allCode]);
  }

  getCode(codeHash) {
    return (0, _classPrivateFieldLooseBase2.default)(this, _allCode)[_allCode][codeHash];
  }

  saveCode(_codeHash, partial) {
    const codeHash = ((0, _util.isString)(_codeHash) ? _reactApi.api.registry.createType('Hash', _codeHash) : _codeHash).toHex();
    const existing = this.getCode(codeHash);

    const json = _objectSpread(_objectSpread(_objectSpread({}, existing ? existing.json : {}), partial), {}, {
      codeHash,
      genesisHash: _reactApi.api.genesisHash.toHex(),
      whenCreated: (existing === null || existing === void 0 ? void 0 : existing.json.whenCreated) || Date.now()
    });

    const key = `${KEY_CODE}${json.codeHash}`;

    _store.default.set(key, json);

    this.addCode(key, json);
  }

  forgetCode(codeHash) {
    this.removeCode(`${KEY_CODE}${codeHash}`, codeHash);
  }

  loadAll(onLoaded) {
    try {
      const genesisHash = _reactApi.api.genesisHash.toHex();

      _store.default.each((json, key) => {
        if (json && json.genesisHash === genesisHash && key.startsWith(KEY_CODE)) {
          this.addCode(key, json);
        }
      });

      onLoaded && onLoaded();
    } catch (error) {
      console.error('Unable to load code', error);
    }
  }

  addCode(key, json) {
    try {
      (0, _classPrivateFieldLooseBase2.default)(this, _allCode)[_allCode][json.codeHash] = {
        contractAbi: json.abi ? new _apiContract.Abi(json.abi, _reactApi.api.registry.getChainProperties()) : undefined,
        json
      };
      this.emit('new-code');
    } catch (error) {
      console.error(error);
      this.removeCode(key, json.codeHash);
    }
  }

  removeCode(key, codeHash) {
    try {
      delete (0, _classPrivateFieldLooseBase2.default)(this, _allCode)[_allCode][codeHash];

      _store.default.remove(key);

      this.emit('removed-code');
    } catch (error) {
      console.error(error);
    }
  }

}

var _default = new Store();

exports.default = _default;