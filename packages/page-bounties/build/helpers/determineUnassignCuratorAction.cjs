"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.determineUnassignCuratorAction = determineUnassignCuratorAction;

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function determineUnassignCuratorAction(roles, status, blocksUntilUpdate) {
  const actions = [];

  if (status.isCuratorProposed && roles.includes('Member')) {
    actions.push('UnassignCurator');
  }

  if (status.isActive) {
    if (roles.includes('Member')) {
      actions.push('SlashCuratorMotion');
    }

    if (roles.includes('User') && blocksUntilUpdate && blocksUntilUpdate.lt(_util.BN_ZERO)) {
      actions.push('SlashCuratorAction');
    }
  }

  if (status.isPendingPayout && roles.includes('Member')) {
    actions.push('SlashCuratorMotion');
  }

  return actions;
}