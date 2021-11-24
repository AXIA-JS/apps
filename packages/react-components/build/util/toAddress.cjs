"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toAddress = toAddress;

var _uiKeyring = require("@axia-js/ui-keyring");

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function toAddress(value) {
  let allowIndices = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (value) {
    try {
      const u8a = (0, _util.isHex)(value) ? (0, _util.hexToU8a)(value) : _uiKeyring.keyring.decodeAddress(value);
      (0, _util.assert)(allowIndices || u8a.length === 32 || u8a.length === 20, 'AccountIndex values not allowed');

      if (u8a.length === 20) {
        return (0, _utilCrypto.ethereumEncode)(u8a);
      } else {
        return _uiKeyring.keyring.encodeAddress(u8a);
      }
    } catch (error) {// noop, undefined return indicates invalid/transient
    }
  }

  return undefined;
}