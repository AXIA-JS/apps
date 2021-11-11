"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useActionsQueue;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
const INC = [_util.BN_ONE, _util.BN_TWO, _util.BN_THREE, _util.BN_FOUR, _util.BN_FIVE, _util.BN_SIX, _util.BN_SEVEN, _util.BN_EIGHT, _util.BN_NINE, _util.BN_TEN];
const callOpts = {
  withParams: true
};

function useActionsQueue() {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const currentIndex = (0, _reactHooks.useCall)(api.query.session.currentIndex);
  const queryIndexes = (0, _react.useMemo)(() => currentIndex && INC.map(i => currentIndex.add(i)), [currentIndex]);
  const nextActions = (0, _reactHooks.useCall)(queryIndexes && api.query.paras.actionsQueue.multi, [queryIndexes], callOpts);
  return (0, _react.useMemo)(() => nextActions ? nextActions[0][0].map((sessionIndex, index) => ({
    paraIds: nextActions[1][index],
    sessionIndex
  })).filter(({
    paraIds
  }) => paraIds.length) : [], [nextActions]);
}