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
function getAddressName(address) {
  let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  let defaultName = arguments.length > 2 ? arguments[2] : undefined;
  const meta = (0, _getAddressMeta.getAddressMeta)(address, type);
  return meta.name ? [false, false, meta.name.toUpperCase()] : defaultName ? [false, true, defaultName.toUpperCase()] : [true, false, (0, _toShortAddress.toShortAddress)(address)];
}