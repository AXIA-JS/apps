// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import styled from 'styled-components';
import { LabelHelp } from '@axia-js/react-components';
import { proposalNameToDisplay } from "../helpers/extendedStatuses.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function VotingDescriptionInfo({
  className,
  proposal,
  status
}) {
  const bestProposalName = proposalNameToDisplay(proposal, status);
  const {
    t
  } = useTranslation();
  const votingDescriptions = useRef({
    approveBounty: t('Bounty approval under voting'),
    closeBounty: t('Bounty rejection under voting'),
    proposeCurator: t('Curator proposal under voting'),
    slashCurator: t('Curator slash under voting'),
    unassignCurator: t('Unassign curator under voting')
  });
  return /*#__PURE__*/_jsx("div", {
    className: className,
    "data-testid": "voting-description",
    children: bestProposalName && votingDescriptions.current[bestProposalName] && /*#__PURE__*/_jsx(LabelHelp, {
      help: votingDescriptions.current[bestProposalName]
    })
  });
}

export default /*#__PURE__*/React.memo(styled(VotingDescriptionInfo).withConfig({
  displayName: "VotingDescriptionInfo",
  componentId: "sc-1deks15-0"
})(["margin-left:0.2rem;"]));