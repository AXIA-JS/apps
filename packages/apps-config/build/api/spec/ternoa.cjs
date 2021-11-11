"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
// structs need to be in order

/* eslint-disable sort-keys */
const definitions = {
  types: [{
    // on all versions
    minmax: [0, undefined],
    types: {
      Address: 'AccountId',
      NFTId: 'u32',
      NFTIdOf: 'NFTId',
      NFTData: {
        owner: 'AccountId',
        details: 'NFTDetails',
        sealed: 'bool',
        locked: 'bool'
      },
      NFTDetails: {
        offchain_uri: 'Vec<u8>'
      },
      NFTSeriesDetails: {
        owner: 'AccountId',
        nfts: 'Vec<NFTId>'
      },
      NFTSeriesId: 'u32',
      LookupSource: 'AccountId'
    }
  }]
};
var _default = definitions;
exports.default = _default;