"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseBase"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseKey"));

var _utilCrypto = require("@axia-js/util-crypto");

// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
var _registry = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("registry");

var _setState = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("setState");

class QrSigner {
  constructor(registry, setState) {
    Object.defineProperty(this, _registry, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _setState, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldLooseBase2.default)(this, _registry)[_registry] = registry;
    (0, _classPrivateFieldLooseBase2.default)(this, _setState)[_setState] = setState;
  }

  async signPayload(payload) {
    return new Promise((resolve, reject) => {
      // limit size of the transaction
      const isQrHashed = payload.method.length > 5000;

      const wrapper = (0, _classPrivateFieldLooseBase2.default)(this, _registry)[_registry].createType('ExtrinsicPayload', payload, {
        version: payload.version
      });

      const qrPayload = isQrHashed ? (0, _utilCrypto.blake2AsU8a)(wrapper.toU8a(true)) : wrapper.toU8a();

      (0, _classPrivateFieldLooseBase2.default)(this, _setState)[_setState]({
        isQrHashed,
        qrAddress: payload.address,
        qrPayload,
        qrReject: reject,
        qrResolve: resolve
      });
    });
  }

}

exports.default = QrSigner;