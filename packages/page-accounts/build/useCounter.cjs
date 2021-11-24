"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCounter;

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useCounter() {
  const {
    hasAccounts
  } = (0, _reactHooks.useAccounts)();
  return hasAccounts ? null : '!';
}