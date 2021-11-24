"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCounter;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useCounter() {
  var _api$derive$bounties;

  const {
    api,
    isApiReady
  } = (0, _reactHooks.useApi)();
  const bounties = (0, _reactHooks.useCall)(isApiReady && ((_api$derive$bounties = api.derive.bounties) === null || _api$derive$bounties === void 0 ? void 0 : _api$derive$bounties.bounties));
  return (0, _react.useMemo)(() => (bounties === null || bounties === void 0 ? void 0 : bounties.length) || 0, [bounties]);
}