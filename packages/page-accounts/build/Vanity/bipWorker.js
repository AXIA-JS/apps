// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { cryptoWaitReady, mnemonicGenerate, mnemonicToMiniSecret, naclKeypairFromSeed, schnorrkelKeypairFromSeed } from '@axia-js/util-crypto';
const ctx = self;
cryptoWaitReady().catch(() => {// ignore
});

ctx.onmessage = async ({
  data: {
    pairType
  }
}) => {
  await cryptoWaitReady();
  const seed = mnemonicGenerate();
  const miniSecret = mnemonicToMiniSecret(seed);
  const {
    publicKey
  } = pairType === 'sr25519' ? schnorrkelKeypairFromSeed(miniSecret) : naclKeypairFromSeed(miniSecret);
  ctx.postMessage({
    publicKey,
    seed
  });
};