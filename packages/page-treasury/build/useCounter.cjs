"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCounter;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useCounter() {
  var _api$derive$treasury;

  const {
    hasAccounts
  } = (0, _reactHooks.useAccounts)();
  const {
    api,
    isApiReady
  } = (0, _reactHooks.useApi)();
  const proposals = (0, _reactHooks.useCall)(isApiReady && hasAccounts && ((_api$derive$treasury = api.derive.treasury) === null || _api$derive$treasury === void 0 ? void 0 : _api$derive$treasury.proposals));
  return (0, _react.useMemo)(() => (proposals === null || proposals === void 0 ? void 0 : proposals.proposals.length) || 0, [proposals]);
}