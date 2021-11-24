"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sliceHex = sliceHex;

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function sliceHex(value) {
  let max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  const hex = value.toHex();
  return hex.length > 2 * max + 2 ? `${hex.slice(0, max + 2)}…${hex.slice(-max)}` : hex === '0x' ? '' : hex;
}