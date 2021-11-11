"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCounter;

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
const transformCounter = {
  transform: motions => motions.filter(({
    votes
  }) => !!votes).length
};

function useCounter() {
  var _api$derive$council;

  const {
    hasAccounts
  } = (0, _reactHooks.useAccounts)();
  const {
    api,
    isApiReady
  } = (0, _reactHooks.useApi)();
  const counter = (0, _reactHooks.useCall)(isApiReady && hasAccounts && ((_api$derive$council = api.derive.council) === null || _api$derive$council === void 0 ? void 0 : _api$derive$council.proposals), undefined, transformCounter) || 0;
  return counter;
}