// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useEffect, useMemo, useState } from 'react';
import { getTreasuryProposalThreshold } from '@axia-js/apps-config';
import { InputAddress, Modal, TxButton } from '@axia-js/react-components';
import { useAccounts, useApi, useCollectiveInstance, useCollectiveMembers } from '@axia-js/react-hooks';
import { truncateTitle } from "../helpers/index.js";
import { useBounties } from "../hooks/index.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function SlashCurator({
  action,
  curatorId,
  description,
  index,
  toggleOpen
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    members
  } = useCollectiveMembers('council');
  const councilMod = useCollectiveInstance('council');
  const {
    unassignCurator
  } = useBounties();
  const [accountId, setAccountId] = useState(null);
  const [threshold, setThreshold] = useState();
  const {
    allAccounts
  } = useAccounts();
  useEffect(() => {
    members && setThreshold(new BN(Math.ceil(members.length * getTreasuryProposalThreshold(api))));
  }, [api, members]);
  const unassignCuratorProposal = useMemo(() => unassignCurator(index), [index, unassignCurator]);
  const actionProperties = useMemo(() => ({
    SlashCuratorAction: {
      filter: allAccounts,
      header: t('This action will Slash the Curator.'),
      helpMessage: t('The Curator that will be slashed.'),
      params: [index],
      proposingAccountTip: t('The account that will create the transaction.'),
      tip: t("Curator's deposit will be slashed and curator will be unassigned. Bounty will return to the Funded state."),
      title: t('Slash curator'),
      tx: unassignCurator
    },
    SlashCuratorMotion: {
      filter: members,
      header: t('This action will create a Council motion to slash the Curator.'),
      helpMessage: t('The Curator that will be slashed.'),
      params: [threshold, unassignCuratorProposal, unassignCuratorProposal === null || unassignCuratorProposal === void 0 ? void 0 : unassignCuratorProposal.length],
      proposingAccountTip: t('The council member that will create the motion, submission equates to an "aye" vote.'),
      tip: t("If the motion is approved, Curator's deposit will be slashed and Curator will be unassigned. Bounty will return to the Funded state."),
      title: t('Slash curator'),
      tx: councilMod && api.tx[councilMod].propose
    },
    UnassignCurator: {
      filter: members,
      header: t('This action will create a Council motion to unassign the Curator.'),
      helpMessage: t('The Curator that will be unassigned'),
      params: [threshold, unassignCuratorProposal, unassignCuratorProposal === null || unassignCuratorProposal === void 0 ? void 0 : unassignCuratorProposal.length],
      proposingAccountTip: t('The council member that will create the motion, submission equates to an "aye" vote.'),
      tip: t('If the motion is approved, the current Curator will be unassigned and the Bounty will return to the Funded state.'),
      title: t('Unassign curator'),
      tx: councilMod && api.tx[councilMod].propose
    }
  }), [t, index, unassignCurator, api, allAccounts, councilMod, members, threshold, unassignCuratorProposal]);
  const {
    filter,
    helpMessage,
    params,
    proposingAccountTip,
    tip,
    title,
    tx
  } = actionProperties[action];

  if (!tx) {
    return null;
  }

  return /*#__PURE__*/_jsxs(Modal, {
    header: `${title} - "${truncateTitle(description, 30)}"`,
    onClose: toggleOpen,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        hint: proposingAccountTip,
        children: /*#__PURE__*/_jsx(InputAddress, {
          filter: filter,
          help: t('The account that will sign the transaction.'),
          label: t('proposing account'),
          onChange: setAccountId,
          type: "account",
          withLabel: true
        })
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: tip,
        children: /*#__PURE__*/_jsx(InputAddress, {
          defaultValue: curatorId,
          help: helpMessage,
          isDisabled: true,
          label: t('current curator'),
          withLabel: true
        })
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: accountId,
        icon: "check",
        label: "Approve",
        onStart: toggleOpen,
        params: params,
        tx: tx
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(SlashCurator);