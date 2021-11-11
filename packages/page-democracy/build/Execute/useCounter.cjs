"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCounter;

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useCounter() {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const queued = (0, _reactHooks.useCall)(api.derive.democracy.dispatchQueue);
  return (queued === null || queued === void 0 ? void 0 : queued.length) || 0;
}