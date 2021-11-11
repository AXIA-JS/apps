// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useMemo } from 'react';
import { useBountyStatus } from '@axia-js/app-bounties/hooks';
import { BN_HUNDRED, BN_ZERO } from '@axia-js/util';
import { useBounties } from "../hooks/index.js";
import { useTranslation } from "../translate.js";
import BountyInfo from "./BountyInfo.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const BLOCKS_PERCENTAGE_LEFT_TO_SHOW_WARNING = 10;
const BLOCKS_LEFT_TO_SHOW_WARNING = new BN('10000');

function BountyActionMessage({
  bestNumber,
  blocksUntilUpdate,
  status
}) {
  const {
    t
  } = useTranslation();
  const {
    unlockAt
  } = useBountyStatus(status);
  const {
    bountyUpdatePeriod
  } = useBounties();
  const blocksUntilPayout = useMemo(() => unlockAt === null || unlockAt === void 0 ? void 0 : unlockAt.sub(bestNumber), [bestNumber, unlockAt]);
  const blocksPercentageLeftToShowWarning = bountyUpdatePeriod === null || bountyUpdatePeriod === void 0 ? void 0 : bountyUpdatePeriod.muln(BLOCKS_PERCENTAGE_LEFT_TO_SHOW_WARNING).div(BN_HUNDRED);
  const blocksToShowWarning = blocksPercentageLeftToShowWarning !== null && blocksPercentageLeftToShowWarning !== void 0 ? blocksPercentageLeftToShowWarning : BLOCKS_LEFT_TO_SHOW_WARNING;
  return /*#__PURE__*/_jsxs("div", {
    children: [(blocksUntilUpdate === null || blocksUntilUpdate === void 0 ? void 0 : blocksUntilUpdate.lte(BN_ZERO)) && /*#__PURE__*/_jsx(BountyInfo, {
      description: t('Update overdue'),
      type: "warning"
    }), (blocksUntilUpdate === null || blocksUntilUpdate === void 0 ? void 0 : blocksUntilUpdate.lt(blocksToShowWarning)) && (blocksUntilUpdate === null || blocksUntilUpdate === void 0 ? void 0 : blocksUntilUpdate.gt(BN_ZERO)) && /*#__PURE__*/_jsx(BountyInfo, {
      description: t('Close deadline'),
      type: "warning"
    }), status.isApproved && /*#__PURE__*/_jsx(BountyInfo, {
      description: t('Waiting for Bounty Funding'),
      type: "info"
    }), status.isCuratorProposed && /*#__PURE__*/_jsx(BountyInfo, {
      description: t("Waiting for Curator's acceptance"),
      type: "info"
    }), (blocksUntilPayout === null || blocksUntilPayout === void 0 ? void 0 : blocksUntilPayout.lt(BN_ZERO)) && /*#__PURE__*/_jsx(BountyInfo, {
      description: t('Waiting for implementer to claim'),
      type: "info"
    })]
  });
}

export default /*#__PURE__*/React.memo(BountyActionMessage);