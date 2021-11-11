"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateBountyBond = calculateBountyBond;
exports.countUtf8Bytes = countUtf8Bytes;

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function calculateBountyBond(description, depositBase, depositPerByte) {
  return depositBase.add(depositPerByte.muln(countUtf8Bytes(description)));
}

function countUtf8Bytes(str) {
  return new Blob([str]).size;
}