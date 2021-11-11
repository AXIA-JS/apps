"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOwnStashes = useOwnStashes;
exports.useOwnStashIds = useOwnStashIds;

var _react = require("react");

var _useAccounts = require("./useAccounts.cjs");

var _useApi = require("./useApi.cjs");

var _useCall = require("./useCall.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function getStashes(allAccounts, ownBonded, ownLedger) {
  const result = [];
  ownBonded.forEach((value, index) => {
    value.isSome && result.push([allAccounts[index], true]);
  });
  ownLedger.forEach(ledger => {
    if (ledger.isSome) {
      const stashId = ledger.unwrap().stash.toString();
      !result.some(([accountId]) => accountId === stashId) && result.push([stashId, false]);
    }
  });
  return result;
}

function useOwnStashes() {
  var _api$query$staking, _api$query$staking2;

  const {
    allAccounts,
    hasAccounts
  } = (0, _useAccounts.useAccounts)();
  const {
    api
  } = (0, _useApi.useApi)();
  const ownBonded = (0, _useCall.useCall)(hasAccounts && ((_api$query$staking = api.query.staking) === null || _api$query$staking === void 0 ? void 0 : _api$query$staking.bonded.multi), [allAccounts]);
  const ownLedger = (0, _useCall.useCall)(hasAccounts && ((_api$query$staking2 = api.query.staking) === null || _api$query$staking2 === void 0 ? void 0 : _api$query$staking2.ledger.multi), [allAccounts]);
  return (0, _react.useMemo)(() => hasAccounts ? ownBonded && ownLedger ? getStashes(allAccounts, ownBonded, ownLedger) : undefined : [], [allAccounts, hasAccounts, ownBonded, ownLedger]);
}

function useOwnStashIds() {
  const ownStashes = useOwnStashes();
  return (0, _react.useMemo)(() => ownStashes ? ownStashes.map(([stashId]) => stashId) : undefined, [ownStashes]);
}