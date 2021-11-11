"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModuleElections = useModuleElections;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useModuleElections() {
  const {
    api
  } = (0, _reactHooks.useApi)();
  return (0, _react.useMemo)(() => api.tx.phragmenElection ? 'phragmenElection' : api.tx.electionsPhragmen ? 'electionsPhragmen' : api.tx.elections ? 'elections' : null, [api]);
}