"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTreasury = useTreasury;

var _react = require("react");

var _util = require("@axia-js/util");

var _useApi = require("./useApi.cjs");

var _useCall = require("./useCall.cjs");

// Copyright 2017-2020 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
const EMPTY_U8A_32 = new Uint8Array(32);

function useTreasury() {
  var _api$derive$balances;

  const {
    api
  } = (0, _useApi.useApi)();
  const [result, setResult] = (0, _react.useState)(() => ({
    spendPeriod: api.consts.treasury ? api.consts.treasury.spendPeriod : _util.BN_ZERO,
    treasuryAccount: (0, _util.u8aConcat)('modl', api.consts.treasury && api.consts.treasury.palletId ? api.consts.treasury.palletId.toU8a(true) : 'py/trsry', EMPTY_U8A_32).subarray(0, 32)
  }));
  const treasuryBalance = (0, _useCall.useCall)((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.account, [result.treasuryAccount]);
  (0, _react.useEffect)(() => {
    treasuryBalance && api.consts.treasury && setResult(_ref => {
      let {
        spendPeriod,
        treasuryAccount
      } = _ref;
      return {
        burn: treasuryBalance.freeBalance.gt(_util.BN_ZERO) && !api.consts.treasury.burn.isZero() ? api.consts.treasury.burn.mul(treasuryBalance.freeBalance).div(_util.BN_MILLION) : _util.BN_ZERO,
        spendPeriod,
        treasuryAccount,
        value: treasuryBalance.freeBalance.gt(_util.BN_ZERO) ? treasuryBalance.freeBalance : undefined
      };
    });
  }, [api, treasuryBalance]);
  return result;
}