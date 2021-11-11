"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useUnbondDuration;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useUnbondDuration() {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const sessionInfo = (0, _reactHooks.useCall)(api.derive.session.info);
  return (0, _react.useMemo)(() => sessionInfo && sessionInfo.sessionLength.gt(_util.BN_ONE) ? sessionInfo.eraLength.mul(api.consts.staking.bondingDuration) : undefined, [api, sessionInfo]);
}