// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { keyring } from '@axia-js/ui-keyring';
export function getAccountCryptoType(accountId) {
  try {
    const current = accountId ? keyring.getPair(accountId.toString()) : null;

    if (current) {
      return current.meta.isInjected ? 'injected' : current.meta.isHardware ? current.meta.hardwareType || 'hardware' : current.meta.isExternal ? current.meta.isMultisig ? 'multisig' : current.meta.isProxied ? 'proxied' : 'external' : current.type;
    }
  } catch {// cannot determine, keep unknown
  }

  return 'unknown';
}