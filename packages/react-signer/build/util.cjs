"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheUnlock = cacheUnlock;
exports.lockAccount = lockAccount;
exports.extractExternal = extractExternal;
exports.recodeAddress = recodeAddress;
exports.handleTxResults = handleTxResults;
exports.UNLOCK_MINS = void 0;

var _uiKeyring = require("@axia-js/ui-keyring");

// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
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
const UNLOCK_MINS = 15;
exports.UNLOCK_MINS = UNLOCK_MINS;
const LOCK_DELAY = UNLOCK_MINS * 60 * 1000;
const lockCountdown = {};

function cacheUnlock(pair) {
  lockCountdown[pair.address] = Date.now() + LOCK_DELAY;
}

function lockAccount(pair) {
  if (Date.now() > (lockCountdown[pair.address] || 0) && !pair.isLocked) {
    pair.lock();
  }
}

function extractExternal(accountId) {
  if (!accountId) {
    return NO_FLAGS;
  }

  let publicKey;

  try {
    publicKey = _uiKeyring.keyring.decodeAddress(accountId);
  } catch (error) {
    console.error(error);
    return NO_FLAGS;
  }

  const pair = _uiKeyring.keyring.getPair(publicKey);

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

function recodeAddress(address) {
  return _uiKeyring.keyring.encodeAddress(_uiKeyring.keyring.decodeAddress(address));
}

function handleTxResults(handler, queueSetTxStatus, {
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