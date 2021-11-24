"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toShortAddress = toShortAddress;

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function toShortAddress(_address) {
  const address = (_address || '').toString();

  return address.length > 13 ? `${address.slice(0, 6)}…${address.slice(-6)}` : address;
}