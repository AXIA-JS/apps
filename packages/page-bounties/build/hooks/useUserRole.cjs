"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUserRole = useUserRole;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useUserRole(curatorId) {
  const {
    allAccounts,
    hasAccounts
  } = (0, _reactHooks.useAccounts)();
  const {
    isMember
  } = (0, _reactHooks.useCollectiveMembers)('council');
  const isCurator = (0, _react.useMemo)(() => curatorId && allAccounts.includes(curatorId.toString()), [allAccounts, curatorId]);
  const roles = [];

  if (isCurator) {
    roles.push('Curator');
  }

  if (isMember) {
    roles.push('Member');
  }

  if (hasAccounts) {
    roles.push('User');
  }

  return {
    isCurator: !!isCurator,
    roles
  };
}