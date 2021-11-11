// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
export function sliceHex(value, max = 6) {
  const hex = value.toHex();
  return hex.length > 2 * max + 2 ? `${hex.slice(0, max + 2)}…${hex.slice(-max)}` : hex === '0x' ? '' : hex;
}