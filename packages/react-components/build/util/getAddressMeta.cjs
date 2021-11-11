"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAddressMeta = getAddressMeta;

var _uiKeyring = require("@axia-js/ui-keyring");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function getAddressMeta(address, type = null) {
  let meta;

  try {
    const pair = _uiKeyring.keyring.getAddress(address, type);

    meta = pair && pair.meta;
  } catch (error) {// we could pass invalid addresses, so it may throw
  }

  return meta || {};
}