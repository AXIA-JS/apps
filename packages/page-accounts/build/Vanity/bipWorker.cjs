"use strict";

var _utilCrypto = require("@axia-js/util-crypto");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
const ctx = self;
(0, _utilCrypto.cryptoWaitReady)().catch(() => {// ignore
});

ctx.onmessage = async _ref => {
  let {
    data: {
      pairType
    }
  } = _ref;
  await (0, _utilCrypto.cryptoWaitReady)();
  const seed = (0, _utilCrypto.mnemonicGenerate)();
  const miniSecret = (0, _utilCrypto.mnemonicToMiniSecret)(seed);
  const {
    publicKey
  } = pairType === 'sr25519' ? (0, _utilCrypto.schnorrkelKeypairFromSeed)(miniSecret) : (0, _utilCrypto.naclKeypairFromSeed)(miniSecret);
  ctx.postMessage({
    publicKey,
    seed
  });
};