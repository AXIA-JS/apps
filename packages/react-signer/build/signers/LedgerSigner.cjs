"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseBase"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseKey"));

// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
let id = 0;

var _accountOffset = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("accountOffset");

var _addressOffset = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("addressOffset");

var _getLedger = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("getLedger");

var _registry = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("registry");

class LedgerSigner {
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
    (0, _classPrivateFieldLooseBase2.default)(this, _accountOffset)[_accountOffset] = accountOffset;
    (0, _classPrivateFieldLooseBase2.default)(this, _addressOffset)[_addressOffset] = addressOffset;
    (0, _classPrivateFieldLooseBase2.default)(this, _getLedger)[_getLedger] = getLedger;
    (0, _classPrivateFieldLooseBase2.default)(this, _registry)[_registry] = registry;
  }

  async signPayload(payload) {
    const raw = (0, _classPrivateFieldLooseBase2.default)(this, _registry)[_registry].createType('ExtrinsicPayload', payload, {
      version: payload.version
    });

    const {
      signature
    } = await (0, _classPrivateFieldLooseBase2.default)(this, _getLedger)[_getLedger]().sign(raw.toU8a(true), (0, _classPrivateFieldLooseBase2.default)(this, _accountOffset)[_accountOffset], (0, _classPrivateFieldLooseBase2.default)(this, _addressOffset)[_addressOffset]);
    return {
      id: ++id,
      signature
    };
  }

}

exports.default = LedgerSigner;