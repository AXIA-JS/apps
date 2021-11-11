// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef, useState } from 'react';
import { getTreasuryProposalThreshold } from '@axia-js/apps-config';
import { Button, Dropdown, InputAddress, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useCollectiveInstance, useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Council({
  id,
  isDisabled,
  members
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [isOpen, toggleOpen] = useToggle();
  const [accountId, setAccountId] = useState(null);
  const [proposalType, setProposalType] = useState('accept');
  const [{
    proposal,
    proposalLength
  }, setProposal] = useState(() => ({
    proposalLength: 0
  }));
  const modCouncil = useCollectiveInstance('council');
  const threshold = Math.ceil(((members === null || members === void 0 ? void 0 : members.length) || 0) * getTreasuryProposalThreshold(api));
  const councilTypeOptRef = useRef([{
    text: t('Acceptance proposal to council'),
    value: 'accept'
  }, {
    text: t('Rejection proposal to council'),
    value: 'reject'
  }]);
  useEffect(() => {
    const proposal = proposalType === 'reject' ? api.tx.treasury.rejectProposal(id) : api.tx.treasury.approveProposal(id);
    setProposal({
      proposal,
      proposalLength: proposal.length
    });
  }, [api, id, proposalType]);

  if (!modCouncil) {
    return null;
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isOpen && /*#__PURE__*/_jsxs(Modal, {
      header: t('Send to council'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The council member that is proposing this, submission equates to an "aye" vote.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            filter: members,
            help: t('Select the council account you wish to use to make the proposal.'),
            label: t('submit with council account'),
            onChange: setAccountId,
            type: "account",
            withLabel: true
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('Proposal can either be to approve or reject this spend. Once approved, the change is applied by either removing the proposal or scheduling payout.'),
          children: /*#__PURE__*/_jsx(Dropdown, {
            help: t('The type of council proposal to submit.'),
            label: t('council proposal type'),
            onChange: setProposalType,
            options: councilTypeOptRef.current,
            value: proposalType
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "check",
          isDisabled: !accountId || !threshold,
          label: t('Send to council'),
          onStart: toggleOpen,
          params: api.tx[modCouncil].propose.meta.args.length === 3 ? [threshold, proposal, proposalLength] : [threshold, proposal],
          tx: api.tx[modCouncil].propose
        })
      })]
    }), /*#__PURE__*/_jsx(Button, {
      icon: "step-forward",
      isDisabled: isDisabled,
      label: t('To council'),
      onClick: toggleOpen
    })]
  });
}

export default /*#__PURE__*/React.memo(Council);