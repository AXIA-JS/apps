"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCounter;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useCounter() {
  var _api$derive$democracy, _api$derive$democracy2;

  const {
    hasAccounts
  } = (0, _reactHooks.useAccounts)();
  const {
    api,
    isApiReady
  } = (0, _reactHooks.useApi)();
  const mountedRef = (0, _reactHooks.useIsMountedRef)();
  const proposals = (0, _reactHooks.useCall)(isApiReady && hasAccounts && ((_api$derive$democracy = api.derive.democracy) === null || _api$derive$democracy === void 0 ? void 0 : _api$derive$democracy.proposals));
  const referenda = (0, _reactHooks.useCall)(isApiReady && hasAccounts && ((_api$derive$democracy2 = api.derive.democracy) === null || _api$derive$democracy2 === void 0 ? void 0 : _api$derive$democracy2.referendumsActive));
  const [counter, setCounter] = (0, _react.useState)(0);
  (0, _react.useEffect)(() => {
    mountedRef.current && setCounter(((proposals === null || proposals === void 0 ? void 0 : proposals.length) || 0) + ((referenda === null || referenda === void 0 ? void 0 : referenda.length) || 0));
  }, [mountedRef, proposals, referenda]);
  return counter;
}