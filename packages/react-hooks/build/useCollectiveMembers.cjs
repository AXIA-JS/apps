"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCollectiveMembers = useCollectiveMembers;

var _react = require("react");

var _useAccounts = require("./useAccounts.cjs");

var _useApi = require("./useApi.cjs");

var _useCall = require("./useCall.cjs");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
const transformMembers = {
  transform: accounts => accounts.map(accountId => accountId.toString())
};

function useCollectiveMembers(collective) {
  var _api$derive$collectiv;

  const {
    api
  } = (0, _useApi.useApi)();
  const {
    allAccounts,
    hasAccounts
  } = (0, _useAccounts.useAccounts)();
  const retrieved = (0, _useCall.useCall)(hasAccounts && ((_api$derive$collectiv = api.derive[collective]) === null || _api$derive$collectiv === void 0 ? void 0 : _api$derive$collectiv.members), undefined, transformMembers);
  return (0, _react.useMemo)(() => ({
    isMember: (retrieved || []).some(accountId => allAccounts.includes(accountId)),
    members: retrieved || []
  }), [allAccounts, retrieved]);
}