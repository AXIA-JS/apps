// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
export function calculateBountyBond(description, depositBase, depositPerByte) {
  return depositBase.add(depositPerByte.muln(countUtf8Bytes(description)));
}
export function countUtf8Bytes(str) {
  return new Blob([str]).size;
}