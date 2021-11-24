// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { getAddressMeta } from "./getAddressMeta.js";
export function getAddressTags(address, type = null) {
  return getAddressMeta(address, type).tags || [];
}