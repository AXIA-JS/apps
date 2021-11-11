import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";
// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
let id = 0;

var _accountOffset = /*#__PURE__*/_classPrivateFieldLooseKey("accountOffset");

var _addressOffset = /*#__PURE__*/_classPrivateFieldLooseKey("addressOffset");

var _getLedger = /*#__PURE__*/_classPrivateFieldLooseKey("getLedger");

var _registry = /*#__PURE__*/_classPrivateFieldLooseKey("registry");

export default class LedgerSigner {
  constructor(registry, getLedger, accountOffset, addressOffset) {
    Object.defineProperty(this, _accountOffset, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _addressOffset, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _getLedger, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _registry, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldLooseBase(this, _accountOffset)[_accountOffset] = accountOffset;
    _classPrivateFieldLooseBase(this, _addressOffset)[_addressOffset] = addressOffset;
    _classPrivateFieldLooseBase(this, _getLedger)[_getLedger] = getLedger;
    _classPrivateFieldLooseBase(this, _registry)[_registry] = registry;
  }

  async signPayload(payload) {
    const raw = _classPrivateFieldLooseBase(this, _registry)[_registry].createType('ExtrinsicPayload', payload, {
      version: payload.version
    });

    const {
      signature
    } = await _classPrivateFieldLooseBase(this, _getLedger)[_getLedger]().sign(raw.toU8a(true), _classPrivateFieldLooseBase(this, _accountOffset)[_accountOffset], _classPrivateFieldLooseBase(this, _addressOffset)[_addressOffset]);
    return {
      id: ++id,
      signature
    };
  }

}