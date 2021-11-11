// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useEffect, useMemo, useState } from 'react';
import { getTreasuryProposalThreshold } from '@axia-js/apps-config';
import { Button, InputAddress, InputBalance, MarkError, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useCollectiveInstance, useCollectiveMembers, useToggle } from '@axia-js/react-hooks';
import { BN_ZERO } from '@axia-js/util';
import { truncateTitle } from "../helpers/index.js";
import { useBounties } from "../hooks/index.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const BOUNTY_METHODS = ['proposeCurator'];

function ProposeCuratorAction({
  description,
  index,
  proposals,
  value
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
    proposeCurator
  } = useBounties();
  const [isOpen, toggleOpen] = useToggle();
  const [accountId, setAccountId] = useState(null);
  const [curatorId, setCuratorId] = useState(null);
  const [threshold, setThreshold] = useState();
  const [fee, setFee] = useState(BN_ZERO);
  const [isFeeValid, setIsFeeValid] = useState(false);
  useEffect(() => {
    members && setThreshold(new BN(Math.ceil(members.length * getTreasuryProposalThreshold(api))));
  }, [api, members]);
  const proposeCuratorProposal = useMemo(() => curatorId && proposeCurator(index, curatorId, fee), [curatorId, fee, index, proposeCurator]);
  const isVotingInitiated = useMemo(() => (proposals === null || proposals === void 0 ? void 0 : proposals.filter(({
    proposal
  }) => BOUNTY_METHODS.includes(proposal.method)).length) !== 0, [proposals]);
  useEffect(() => {
    setIsFeeValid(!!(value !== null && value !== void 0 && value.gt(fee)));
  }, [value, fee]);
  return isMember && !isVotingInitiated && councilMod ? /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "step-forward",
      isDisabled: false,
      label: t('Propose curator'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/_jsxs(Modal, {
      header: `${t('Propose curator')} - "${truncateTitle(description, 30)}"`,
      onClose: toggleOpen,
      size: "large",
      testId: "propose-curator-modal",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The council member that will create the motion.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            filter: members,
            help: t('Select the council member account you wish to use to create a motion for the Bounty.'),
            label: t('proposing account'),
            onChange: setAccountId,
            type: "account",
            withLabel: true
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('Choose a curator whose background and expertise is such that they are capable of determining when the task is complete.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            help: t('Select an account which (after a successful vote) will act as a curator.'),
            label: t('select curator'),
            onChange: setCuratorId,
            withLabel: true
          })
        }), /*#__PURE__*/_jsxs(Modal.Columns, {
          hint: t('Part of the bounty value that will go to the Curator as a reward for their work'),
          children: [/*#__PURE__*/_jsx(InputBalance, {
            help: t('A reward for a curator, this amount is included in the total value of the bounty.'),
            isError: !isFeeValid,
            isZeroable: true,
            label: t("curator's fee"),
            onChange: setFee,
            value: fee
          }), !isFeeValid && /*#__PURE__*/_jsx(MarkError, {
            content: t("Curator's fee can't be higher than bounty value.")
          })]
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "check",
          isDisabled: !isFeeValid,
          label: t('Propose curator'),
          onStart: toggleOpen,
          params: [threshold, proposeCuratorProposal, proposeCuratorProposal === null || proposeCuratorProposal === void 0 ? void 0 : proposeCuratorProposal.length],
          tx: api.tx[councilMod].propose
        })
      })]
    })]
  }) : null;
}

export default /*#__PURE__*/React.memo(ProposeCuratorAction);