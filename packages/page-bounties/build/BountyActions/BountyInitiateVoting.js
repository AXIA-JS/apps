// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getTreasuryProposalThreshold } from '@axia-js/apps-config';
import { Button, InputAddress, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useCollectiveInstance, useCollectiveMembers, useToggle } from '@axia-js/react-hooks';
import { truncateTitle } from "../helpers/index.js";
import { useBounties } from "../hooks/index.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const BOUNTY_METHODS = ['approveBounty', 'closeBounty'];

function BountyInitiateVoting({
  description,
  index,
  proposals
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    isMember,
    members
  } = useCollectiveMembers('council');
  const councilMod = useCollectiveInstance('council');
  const {
    approveBounty,
    closeBounty
  } = useBounties();
  const [isOpen, toggleOpen] = useToggle();
  const [accountId, setAccountId] = useState(null);
  const [threshold, setThreshold] = useState();
  useEffect(() => {
    members && setThreshold(new BN(Math.ceil(members.length * getTreasuryProposalThreshold(api))));
  }, [api, members]);
  const approveBountyProposal = useRef(approveBounty(index));
  const closeBountyProposal = useRef(closeBounty(index));
  const isVotingInitiated = useMemo(() => (proposals === null || proposals === void 0 ? void 0 : proposals.filter(({
    proposal
  }) => BOUNTY_METHODS.includes(proposal.method)).length) !== 0, [proposals]);
  return isMember && !isVotingInitiated && councilMod ? /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "step-forward",
      isDisabled: false,
      label: t('Initiate voting'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/_jsxs(Modal, {
      header: `${t('Initiate voting')} - "${truncateTitle(description, 30)}"`,
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/_jsx(Modal.Content, {
        children: /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The council member that will create a motion, submission equates to an "aye" vote for chosen option.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            filter: members,
            help: t('Select the council member account you wish to use to create a motion for the Bounty.'),
            label: t('vote with account'),
            onChange: setAccountId,
            type: "account",
            withLabel: true
          })
        })
      }), /*#__PURE__*/_jsxs(Modal.Actions, {
        children: [/*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "check",
          isDisabled: false,
          label: t('Approve'),
          onStart: toggleOpen,
          params: [threshold, approveBountyProposal.current, approveBountyProposal.current.length],
          tx: api.tx[councilMod].propose
        }), /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "ban",
          isDisabled: false,
          label: t('Reject'),
          onStart: toggleOpen,
          params: [threshold, closeBountyProposal.current, closeBountyProposal.current.length],
          tx: api.tx[councilMod].propose
        })]
      })]
    })]
  }) : null;
}

export default /*#__PURE__*/React.memo(BountyInitiateVoting);