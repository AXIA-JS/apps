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
      LookupSource: 'AccountId',
      ChainId: {
        _enum: {
          RelayChain: null,
          Allychain: 'AllyId'
        }
      },
      XCurrencyId: {
        chain_id: 'ChainId',
        currency_id: 'Bytes'
      },
      CurrencyIdOf: 'CurrencyId',
      CurrencyId: {
        _enum: {
          Token: 'TokenSymbol'
        }
      },
      TokenSymbol: {
        _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC', 'SDN', 'PLM']
      },
      AmountOf: 'Amount',
      Amount: 'i128'
    }
  }]
};
var _default = definitions;
exports.default = _default;