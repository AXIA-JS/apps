"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCounter;

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
const transformCounter = {
  transform: proposals => proposals.length
};

function useCounter() {
  var _api$derive$technical;

  const {
    api,
    isApiReady
  } = (0, _reactHooks.useApi)();
  const counter = (0, _reactHooks.useCall)(isApiReady && ((_api$derive$technical = api.derive.technicalCommittee) === null || _api$derive$technical === void 0 ? void 0 : _api$derive$technical.proposals), undefined, transformCounter) || 0;
  return counter;
}