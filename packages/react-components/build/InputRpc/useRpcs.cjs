"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useRpcs;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

var _rpcs = require("./rpcs.cjs");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useRpcs() {
  const {
    api
  } = (0, _reactHooks.useApi)();
  return (0, _react.useMemo)(() => (0, _rpcs.getAllRpc)(api.registry, api.runtimeChain, api.runtimeVersion), [api]);
}