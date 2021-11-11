"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBounties = useBounties;

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useBounties() {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const bounties = (0, _reactHooks.useCall)(api.derive.bounties.bounties);
  const bountyIndex = (0, _reactHooks.useCall)((api.query.bounties || api.query.treasury).bountyCount);
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const constsBase = api.consts.bounties || api.consts.treasury;
  const bountyCuratorDeposit = constsBase.bountyCuratorDeposit.toBn();
  const bountyDepositBase = constsBase.bountyDepositBase.toBn();
  const bountyValueMinimum = constsBase.bountyValueMinimum.toBn();
  const maximumReasonLength = constsBase.maximumReasonLength.toNumber();
  const dataDepositPerByte = constsBase.dataDepositPerByte.toBn();
  const bountyUpdatePeriod = constsBase.bountyUpdatePeriod;
  const proposeBounty = (api.tx.bounties || api.tx.treasury).proposeBounty;
  const proposeCurator = (api.tx.bounties || api.tx.treasury).proposeCurator;
  const claimBounty = (api.tx.bounties || api.tx.treasury).claimBounty;
  const acceptCurator = (api.tx.bounties || api.tx.treasury).acceptCurator;
  const approveBounty = (api.tx.bounties || api.tx.treasury).approveBounty;
  const closeBounty = (api.tx.bounties || api.tx.treasury).closeBounty;
  const extendBountyExpiry = (api.tx.bounties || api.tx.treasury).extendBountyExpiry;
  const unassignCurator = (api.tx.bounties || api.tx.treasury).unassignCurator;
  const awardBounty = (api.tx.bounties || api.tx.treasury).awardBounty;
  return {
    acceptCurator,
    approveBounty,
    awardBounty,
    bestNumber,
    bounties,
    bountyCuratorDeposit,
    bountyDepositBase,
    bountyIndex,
    bountyUpdatePeriod,
    bountyValueMinimum,
    claimBounty,
    closeBounty,
    dataDepositPerByte,
    extendBountyExpiry,
    maximumReasonLength,
    proposeBounty,
    proposeCurator,
    unassignCurator
  };
}