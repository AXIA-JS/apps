// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
export function insertSpaceBeforeCapitalLetter(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}
export function truncateTitle(str, maxLength) {
  const ellipsis = String.fromCharCode(8230);
  return str.length > maxLength ? str.substr(0, maxLength - 1) + ellipsis : str;
}