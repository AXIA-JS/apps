import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";

var _queuePayload = /*#__PURE__*/_classPrivateFieldLooseKey("queuePayload");

var _queueSetTxStatus = /*#__PURE__*/_classPrivateFieldLooseKey("queueSetTxStatus");

var _registry = /*#__PURE__*/_classPrivateFieldLooseKey("registry");

// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
export default class ApiSigner {
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
    _classPrivateFieldLooseBase(this, _queuePayload)[_queuePayload] = queuePayload;
    _classPrivateFieldLooseBase(this, _queueSetTxStatus)[_queueSetTxStatus] = queueSetTxStatus;
    _classPrivateFieldLooseBase(this, _registry)[_registry] = registry;
  }

  async signPayload(payload) {
    return new Promise((resolve, reject) => {
      _classPrivateFieldLooseBase(this, _queuePayload)[_queuePayload](_classPrivateFieldLooseBase(this, _registry)[_registry], payload, (id, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error('Unable to sign'));
        }
      });
    });
  }

  update(id, result) {
    if (result instanceof _classPrivateFieldLooseBase(this, _registry)[_registry].createClass('Hash')) {
      _classPrivateFieldLooseBase(this, _queueSetTxStatus)[_queueSetTxStatus](id, 'sent', result.toHex());
    } else {
      _classPrivateFieldLooseBase(this, _queueSetTxStatus)[_queueSetTxStatus](id, result.status.type.toLowerCase(), status);
    }
  }

}