"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constsStakingParameters = void 0;
// Copyright 2017-2021 @axia-js/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0
// We must fix this :(

/* eslint-disable sort-keys */
const constsStakingParameters = {
  value: 'constsStakingParameters',
  text: 'Get staking parameters',
  label: {
    color: 'green',
    children: 'Consts',
    size: 'tiny'
  },
  code: `// Get SRML staking parameters as consts
// 'parameter_types' were added to substrate with spec_version: 101.
// This example will throw an error if used with versions before that.

const bondingDuration = api.consts.staking.bondingDuration;
const sessionsPerEra = api.consts.staking.sessionsPerEra;

console.log('Staking bonding duration: ' + bondingDuration);
console.log('Staking sessions per era: ' + sessionsPerEra);`
};
exports.constsStakingParameters = constsStakingParameters;