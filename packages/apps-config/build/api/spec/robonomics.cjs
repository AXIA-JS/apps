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
      Lighthouse: 'H160',
      Record: 'Vec<u8>',
      Technics: 'Vec<u8>',
      Economics: '{}',
      Report: {
        index: 'LiabilityIndex',
        sender: 'AccountId',
        payload: 'Vec<u8>',
        signature: 'MultiSignature'
      },
      ReportFor: 'Report',
      Agreement: {
        technics: 'Technics',
        economics: 'Economics',
        promisee: 'AccountId',
        promisor: 'AccountId',
        promisee_signature: 'MultiSignature',
        promisor_signature: 'MultiSignature'
      },
      LiabilityIndex: 'u32',
      ValidationFunctionParams: {
        max_code_size: 'u32',
        relay_chain_height: 'u32',
        code_upgrade_allowed: 'Option<u32>'
      },
      ChainId: {
        _enum: {
          RelayChain: null,
          Allychain: 'ParaId'
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
        _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC', 'SDN', 'PLM', 'XRT']
      },
      AmountOf: 'Amount',
      Amount: 'i128'
    }
  }]
};
var _default = definitions;
exports.default = _default;