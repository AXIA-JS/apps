"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTRACT_NULL = exports.GAS_LIMIT = exports.ENDOWMENT = void 0;
// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
const ENDOWMENT = 1000;
exports.ENDOWMENT = ENDOWMENT;
const GAS_LIMIT = '100000000000';
exports.GAS_LIMIT = GAS_LIMIT;
const CONTRACT_NULL = {
  abi: null,
  address: null
};
exports.CONTRACT_NULL = CONTRACT_NULL;