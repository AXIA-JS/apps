"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isClaimable = isClaimable;

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function isClaimable(accounts, beneficiary, payoutDue) {
  return payoutDue.ltn(0) && accounts.includes(beneficiary.toString());
}