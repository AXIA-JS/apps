"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAccountCryptoType = getAccountCryptoType;

var _uiKeyring = require("@axia-js/ui-keyring");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function getAccountCryptoType(accountId) {
  try {
    const current = accountId ? _uiKeyring.keyring.getPair(accountId.toString()) : null;

    if (current) {
      return current.meta.isInjected ? 'injected' : current.meta.isHardware ? current.meta.hardwareType || 'hardware' : current.meta.isExternal ? current.meta.isMultisig ? 'multisig' : current.meta.isProxied ? 'proxied' : 'external' : current.type;
    }
  } catch {// cannot determine, keep unknown
  }

  return 'unknown';
}