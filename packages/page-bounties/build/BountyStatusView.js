// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import styled from 'styled-components';
import { LabelHelp } from '@axia-js/react-components';
import { insertSpaceBeforeCapitalLetter } from "./helpers/index.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function BountyStatusView({
  bountyStatus,
  className = ''
}) {
  const {
    t
  } = useTranslation();
  const statusHelpMessages = useRef({
    Active: t('This bounty has received approval and is currently being implemented.'),
    Approved: t('This bounty was approved by the council. When the next spend period starts, it will be funded.'),
    CuratorProposed: t('Curator has been proposed by council. The bounty is waiting for curator to accept the role.'),
    Funded: t('This bounty is funded.'),
    PendingPayout: t('This bounty was completed and the beneficiary was rewarded by the curator. Claiming the payout will be possible after the delay period is over.'),
    Proposed: t('After a bounty was proposed the council decides whether to fund it or not.')
  });
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    "data-testid": 'bountyStatus',
    children: [insertSpaceBeforeCapitalLetter(bountyStatus), /*#__PURE__*/_jsx(LabelHelp, {
      help: statusHelpMessages.current[bountyStatus]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(BountyStatusView).withConfig({
  displayName: "BountyStatusView",
  componentId: "sc-hbkkej-0"
})(["display:flex;align-items:center;"]));