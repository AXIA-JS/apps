// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { keyring } from '@axia-js/ui-keyring';
export function getAddressMeta(address, type = null) {
  let meta;

  try {
    const pair = keyring.getAddress(address, type);
    meta = pair && pair.meta;
  } catch (error) {// we could pass invalid addresses, so it may throw
  }

  return meta || {};
}