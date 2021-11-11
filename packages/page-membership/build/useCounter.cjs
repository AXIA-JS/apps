"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCounter;

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
const transformCounter = {
  transform: proposals => proposals.length
};

function useCounter() {
  var _api$query$membership;

  const {
    api,
    isApiReady
  } = (0, _reactHooks.useApi)();
  const counter = (0, _reactHooks.useCall)(isApiReady && ((_api$query$membership = api.query.membership) === null || _api$query$membership === void 0 ? void 0 : _api$query$membership.proposals), undefined, transformCounter) || 0;
  return counter;
}