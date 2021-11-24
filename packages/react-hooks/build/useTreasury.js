// Copyright 2017-2020 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { BN_MILLION, BN_ZERO, u8aConcat } from '@axia-js/util';
import { useApi } from "./useApi.js";
import { useCall } from "./useCall.js";
const EMPTY_U8A_32 = new Uint8Array(32);
export function useTreasury() {
  var _api$derive$balances;

  const {
    api
  } = useApi();
  const [result, setResult] = useState(() => ({
    spendPeriod: api.consts.treasury ? api.consts.treasury.spendPeriod : BN_ZERO,
    treasuryAccount: u8aConcat('modl', api.consts.treasury && api.consts.treasury.palletId ? api.consts.treasury.palletId.toU8a(true) : 'py/trsry', EMPTY_U8A_32).subarray(0, 32)
  }));
  const treasuryBalance = useCall((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.account, [result.treasuryAccount]);
  useEffect(() => {
    treasuryBalance && api.consts.treasury && setResult(({
      spendPeriod,
      treasuryAccount
    }) => ({
      burn: treasuryBalance.freeBalance.gt(BN_ZERO) && !api.consts.treasury.burn.isZero() ? api.consts.treasury.burn.mul(treasuryBalance.freeBalance).div(BN_MILLION) : BN_ZERO,
      spendPeriod,
      treasuryAccount,
      value: treasuryBalance.freeBalance.gt(BN_ZERO) ? treasuryBalance.freeBalance : undefined
    }));
  }, [api, treasuryBalance]);
  return result;
}