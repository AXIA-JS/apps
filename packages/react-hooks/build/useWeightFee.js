// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import { useMemo } from 'react';
import { BN_BILLION, BN_ZERO, bnToBn, isUndefined } from '@axia-js/util';
import { useApi } from "./useApi.js";
export function useWeightFee(weight, apiOverride) {
  const {
    api
  } = useApi();
  return useMemo(() => {
    var _consts$transactionPa;

    return isUndefined(apiOverride) || apiOverride ? (((_consts$transactionPa = (apiOverride || api).consts.transactionPayment) === null || _consts$transactionPa === void 0 ? void 0 : _consts$transactionPa.weightToFee) || []).reduce((acc, {
      coeffFrac,
      coeffInteger,
      degree,
      negative
    }) => {
      const w = bnToBn(weight).pow(degree);
      const frac = coeffFrac.mul(w).div(BN_BILLION);
      const integer = coeffInteger.mul(w);

      if (negative.isTrue) {
        acc.isub(frac);
        acc.isub(integer);
      } else {
        acc.iadd(frac);
        acc.iadd(integer);
      }

      return acc;
    }, new BN(0)) : BN_ZERO;
  }, [api, apiOverride, weight]);
}