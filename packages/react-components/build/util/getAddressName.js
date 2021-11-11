// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { getAddressMeta } from "./getAddressMeta.js";
import { toShortAddress } from "./toShortAddress.js"; // isName, isDefault, name

export function getAddressName(address, type = null, defaultName) {
  const meta = getAddressMeta(address, type);
  return meta.name ? [false, false, meta.name.toUpperCase()] : defaultName ? [false, true, defaultName.toUpperCase()] : [true, false, toShortAddress(address)];
}