"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAddressName = getAddressName;

var _getAddressMeta = require("./getAddressMeta.cjs");

var _toShortAddress = require("./toShortAddress.cjs");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
// isName, isDefault, name
function getAddressName(address, type = null, defaultName) {
  const meta = (0, _getAddressMeta.getAddressMeta)(address, type);
  return meta.name ? [false, false, meta.name.toUpperCase()] : defaultName ? [false, true, defaultName.toUpperCase()] : [true, false, (0, _toShortAddress.toShortAddress)(address)];
}