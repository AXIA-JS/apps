"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useEraBlocks;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useEraBlocks(era) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const depth = (0, _reactHooks.useCall)(api.query.staking.historyDepth);
  const progress = (0, _reactHooks.useCall)(api.derive.session.progress);
  const forcing = (0, _reactHooks.useCall)(api.query.staking.forceEra);
  return (0, _react.useMemo)(() => depth && era && forcing && progress && progress.sessionLength.gt(_util.BN_ONE) ? (forcing.isForceAlways ? progress.sessionLength : progress.eraLength).mul(depth.sub(progress.activeEra).iadd(era).iadd(_util.BN_ONE)).isub(forcing.isForceAlways ? progress.sessionProgress : progress.eraProgress) : undefined, [depth, era, forcing, progress]);
}