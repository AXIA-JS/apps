// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { useBountyStatus } from "../hooks/index.js";
import AwardBounty from "./AwardBounty.js";
import BountyAcceptCurator from "./BountyAcceptCurator.js";
import BountyClaimAction from "./BountyClaimAction.js";
import BountyInitiateVoting from "./BountyInitiateVoting.js";
import ProposeCuratorAction from "./ProposeCuratorAction.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function BountyActions({
  bestNumber,
  description,
  fee,
  index,
  proposals,
  status,
  value
}) {
  const {
    beneficiary,
    curator,
    unlockAt
  } = useBountyStatus(status);
  const blocksUntilPayout = useMemo(() => unlockAt === null || unlockAt === void 0 ? void 0 : unlockAt.sub(bestNumber), [bestNumber, unlockAt]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [status.isProposed && /*#__PURE__*/_jsx(BountyInitiateVoting, {
      description: description,
      index: index,
      proposals: proposals
    }), status.isFunded && /*#__PURE__*/_jsx(ProposeCuratorAction, {
      description: description,
      index: index,
      proposals: proposals,
      value: value
    }), status.isCuratorProposed && curator && fee && /*#__PURE__*/_jsx(BountyAcceptCurator, {
      curatorId: curator,
      description: description,
      fee: fee,
      index: index
    }), status.isPendingPayout && beneficiary && blocksUntilPayout && /*#__PURE__*/_jsx(BountyClaimAction, {
      beneficiaryId: beneficiary,
      index: index,
      payoutDue: blocksUntilPayout
    }), status.isActive && curator && /*#__PURE__*/_jsx(AwardBounty, {
      curatorId: curator,
      description: description,
      index: index
    })]
  });
}