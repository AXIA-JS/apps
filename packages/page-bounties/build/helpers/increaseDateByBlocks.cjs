"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.increaseDateByBlocks = increaseDateByBlocks;

// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
function increaseDateByBlocks(blocks, blockTime) {
  return new Date(Date.now() + blocks.muln(blockTime).toNumber());
}