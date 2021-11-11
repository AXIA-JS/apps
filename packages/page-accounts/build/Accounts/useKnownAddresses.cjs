"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useKnownAddresses;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useKnownAddresses(exclude) {
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const {
    allAddresses
  } = (0, _reactHooks.useAddresses)();
  return (0, _react.useMemo)(() => [...allAccounts, ...allAddresses].filter(a => a !== exclude), [allAccounts, allAddresses, exclude]);
}