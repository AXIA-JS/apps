"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBlocksPerDays = useBlocksPerDays;

var _react = require("react");

var _util = require("@axia-js/util");

var _useBlockTime = require("./useBlockTime.cjs");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
const A_DAY = new _util.BN(24 * 60 * 60 * 1000);

function useBlocksPerDays(days = 1) {
  const [blockTime] = (0, _useBlockTime.useBlockTime)();
  return (0, _react.useMemo)(() => A_DAY.mul((0, _util.bnToBn)(days)).divn(blockTime), [blockTime, days]);
}