"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStakingInfo = useStakingInfo;

var _useApi = require("./useApi.cjs");

var _useCall = require("./useCall.cjs");

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useStakingInfo(accountId) {
  var _api$derive$staking;

  const {
    api
  } = (0, _useApi.useApi)();
  return (0, _useCall.useCall)((_api$derive$staking = api.derive.staking) === null || _api$derive$staking === void 0 ? void 0 : _api$derive$staking.account, [accountId]);
}