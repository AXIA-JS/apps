"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseBase"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseKey"));

var _util = require("../util.cjs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

let id = 0;

var _keyringPair = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("keyringPair");

var _registry = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("registry");

class AccountSigner {
  constructor(registry, keyringPair) {
    Object.defineProperty(this, _keyringPair, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _registry, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldLooseBase2.default)(this, _keyringPair)[_keyringPair] = keyringPair;
    (0, _classPrivateFieldLooseBase2.default)(this, _registry)[_registry] = registry;
  }

  async signPayload(payload) {
    return new Promise(resolve => {
      const signed = (0, _classPrivateFieldLooseBase2.default)(this, _registry)[_registry].createType('ExtrinsicPayload', payload, {
        version: payload.version
      }).sign((0, _classPrivateFieldLooseBase2.default)(this, _keyringPair)[_keyringPair]);

      (0, _util.lockAccount)((0, _classPrivateFieldLooseBase2.default)(this, _keyringPair)[_keyringPair]);
      resolve(_objectSpread({
        id: ++id
      }, signed));
    });
  }

}

exports.default = AccountSigner;