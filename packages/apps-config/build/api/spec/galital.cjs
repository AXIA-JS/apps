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
      Address: 'MultiAddress',
      LookupSource: 'MultiAddress',
      AccountInfo: 'AccountInfoWithTripleRefCount',
      Account: {
        nonce: 'U256',
        balance: 'U256'
      },
      Transaction: {
        nonce: 'U256',
        action: 'String',
        gas_price: 'u64',
        gas_limit: 'u64',
        value: 'U256',
        input: 'Vec<u8>',
        signature: 'Signature'
      },
      ChainId: 'u8',
      ResourceId: '[u8; 32]',
      DepositNonce: 'u64',
      ProposalVotes: {
        votes_for: 'Vec<AccountId>',
        votes_against: 'Vec<AccountId>',
        status: 'u8',
        expiry: 'U256'
      },
      ClassId: 'u64',
      TokenId: 'u64',
      ClassData: 'Vec<u8>',
      TokenData: 'Vec<u8>',
      ReportReason: {
        _enum: ['None', 'Illigal', 'Plagiarism', 'Duplicate', 'Reported']
      },
      ClassInfoOf: {
        metadata: 'Vec<u8>',
        total_issuance: 'TokenId',
        owner: 'AccountId',
        class_data: 'ClassData'
      },
      ExtendedInfo: {
        display_flag: 'bool',
        report: 'ReportReason',
        frozen: 'bool'
      },
      TokenInfoOf: {
        metadata: 'Vec<u8>',
        owner: 'AccountId',
        class_data: 'ClassData'
      }
    }
  }]
};
var _default = definitions;
exports.default = _default;