// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { keyring } from '@axia-js/ui-keyring';

const NOOP = () => undefined;

const NO_FLAGS = {
  accountOffset: 0,
  addressOffset: 0,
  isHardware: false,
  isMultisig: false,
  isProxied: false,
  isQr: false,
  isUnlockable: false,
  threshold: 0,
  who: []
};
export const UNLOCK_MINS = 15;
const LOCK_DELAY = UNLOCK_MINS * 60 * 1000;
const lockCountdown = {};
export function cacheUnlock(pair) {
  lockCountdown[pair.address] = Date.now() + LOCK_DELAY;
}
export function lockAccount(pair) {
  if (Date.now() > (lockCountdown[pair.address] || 0) && !pair.isLocked) {
    pair.lock();
  }
}
export function extractExternal(accountId) {
  if (!accountId) {
    return NO_FLAGS;
  }

  let publicKey;

  try {
    publicKey = keyring.decodeAddress(accountId);
  } catch (error) {
    console.error(error);
    return NO_FLAGS;
  }

  const pair = keyring.getPair(publicKey);
  const {
    isExternal,
    isHardware,
    isInjected,
    isMultisig,
    isProxied
  } = pair.meta;
  const isUnlockable = !isExternal && !isHardware && !isInjected;

  if (isUnlockable) {
    const entry = lockCountdown[pair.address];

    if (entry && Date.now() > entry && !pair.isLocked) {
      pair.lock();
      lockCountdown[pair.address] = 0;
    }
  }

  return {
    accountOffset: pair.meta.accountOffset || 0,
    addressOffset: pair.meta.addressOffset || 0,
    hardwareType: pair.meta.hardwareType,
    isHardware: !!isHardware,
    isMultisig: !!isMultisig,
    isProxied: !!isProxied,
    isQr: !!isExternal && !isMultisig && !isProxied && !isHardware && !isInjected,
    isUnlockable: isUnlockable && pair.isLocked,
    threshold: pair.meta.threshold || 0,
    who: (pair.meta.who || []).map(recodeAddress)
  };
}
export function recodeAddress(address) {
  return keyring.encodeAddress(keyring.decodeAddress(address));
}
export function handleTxResults(handler, queueSetTxStatus, {
  id,
  txFailedCb = NOOP,
  txSuccessCb = NOOP,
  txUpdateCb = NOOP
}, unsubscribe) {
  return result => {
    if (!result || !result.status) {
      return;
    }

    const status = result.status.type.toLowerCase();
    console.log(`${handler}: status :: ${JSON.stringify(result)}`);
    queueSetTxStatus(id, status, result);
    txUpdateCb(result);

    if (result.status.isFinalized || result.status.isInBlock) {
      result.events.filter(({
        event: {
          section
        }
      }) => section === 'system').forEach(({
        event: {
          method
        }
      }) => {
        if (method === 'ExtrinsicFailed') {
          txFailedCb(result);
        } else if (method === 'ExtrinsicSuccess') {
          txSuccessCb(result);
        }
      });
    } else if (result.isError) {
      txFailedCb(result);
    }

    if (result.isCompleted) {
      unsubscribe();
    }
  };
}