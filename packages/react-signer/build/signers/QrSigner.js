import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";
// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { blake2AsU8a } from '@axia-js/util-crypto';

var _registry = /*#__PURE__*/_classPrivateFieldLooseKey("registry");

var _setState = /*#__PURE__*/_classPrivateFieldLooseKey("setState");

export default class QrSigner {
  constructor(registry, setState) {
    Object.defineProperty(this, _registry, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _setState, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldLooseBase(this, _registry)[_registry] = registry;
    _classPrivateFieldLooseBase(this, _setState)[_setState] = setState;
  }

  async signPayload(payload) {
    return new Promise((resolve, reject) => {
      // limit size of the transaction
      const isQrHashed = payload.method.length > 5000;

      const wrapper = _classPrivateFieldLooseBase(this, _registry)[_registry].createType('ExtrinsicPayload', payload, {
        version: payload.version
      });

      const qrPayload = isQrHashed ? blake2AsU8a(wrapper.toU8a(true)) : wrapper.toU8a();

      _classPrivateFieldLooseBase(this, _setState)[_setState]({
        isQrHashed,
        qrAddress: payload.address,
        qrPayload,
        qrReject: reject,
        qrResolve: resolve
      });
    });
  }

}