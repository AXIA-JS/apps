import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { lockAccount } from "../util.js";
let id = 0;

var _keyringPair = /*#__PURE__*/_classPrivateFieldLooseKey("keyringPair");

var _registry = /*#__PURE__*/_classPrivateFieldLooseKey("registry");

export default class AccountSigner {
  constructor(registry, keyringPair) {
    Object.defineProperty(this, _keyringPair, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _registry, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldLooseBase(this, _keyringPair)[_keyringPair] = keyringPair;
    _classPrivateFieldLooseBase(this, _registry)[_registry] = registry;
  }

  async signPayload(payload) {
    return new Promise(resolve => {
      const signed = _classPrivateFieldLooseBase(this, _registry)[_registry].createType('ExtrinsicPayload', payload, {
        version: payload.version
      }).sign(_classPrivateFieldLooseBase(this, _keyringPair)[_keyringPair]);

      lockAccount(_classPrivateFieldLooseBase(this, _keyringPair)[_keyringPair]);
      resolve(_objectSpread({
        id: ++id
      }, signed));
    });
  }

}