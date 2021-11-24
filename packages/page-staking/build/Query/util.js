// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { BN_THOUSAND, BN_ZERO, isBn, isFunction } from '@axia-js/util';
export function balanceToNumber(amount = BN_ZERO, divisor) {
  const value = isBn(amount) ? amount : isFunction(amount.toBn) ? amount.toBn() : BN_ZERO;
  return value.mul(BN_THOUSAND).div(divisor).toNumber() / 1000;
}