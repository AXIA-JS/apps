"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseBase"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseKey"));

var _queuePayload = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("queuePayload");

var _queueSetTxStatus = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("queueSetTxStatus");

var _registry = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("registry");

// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
class ApiSigner {
  constructor(registry, queuePayload, queueSetTxStatus) {
    Object.defineProperty(this, _queuePayload, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _queueSetTxStatus, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _registry, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldLooseBase2.default)(this, _queuePayload)[_queuePayload] = queuePayload;
    (0, _classPrivateFieldLooseBase2.default)(this, _queueSetTxStatus)[_queueSetTxStatus] = queueSetTxStatus;
    (0, _classPrivateFieldLooseBase2.default)(this, _registry)[_registry] = registry;
  }

  async signPayload(payload) {
    return new Promise((resolve, reject) => {
      (0, _classPrivateFieldLooseBase2.default)(this, _queuePayload)[_queuePayload]((0, _classPrivateFieldLooseBase2.default)(this, _registry)[_registry], payload, (id, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error('Unable to sign'));
        }
      });
    });
  }

  update(id, result) {
    if (result instanceof (0, _classPrivateFieldLooseBase2.default)(this, _registry)[_registry].createClass('Hash')) {
      (0, _classPrivateFieldLooseBase2.default)(this, _queueSetTxStatus)[_queueSetTxStatus](id, 'sent', result.toHex());
    } else {
      (0, _classPrivateFieldLooseBase2.default)(this, _queueSetTxStatus)[_queueSetTxStatus](id, result.status.type.toLowerCase(), status);
    }
  }

}

exports.default = ApiSigner;