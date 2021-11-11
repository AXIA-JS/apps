// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
export function increaseDateByBlocks(blocks, blockTime) {
  return new Date(Date.now() + blocks.muln(blockTime).toNumber());
}