// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useEffect, useRef, useState } from 'react';
import { getTreasuryProposalThreshold } from '@axia-js/apps-config';
import { InputAddress, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useCollectiveInstance, useCollectiveMembers } from '@axia-js/react-hooks';
import { truncateTitle } from "../helpers/index.js";
import { useBounties } from "../hooks/index.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function CloseBounty({
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
    closeBounty
  } = useBounties();
  const [accountId, setAccountId] = useState(null);
  const [threshold, setThreshold] = useState();
  useEffect(() => {
    members && setThreshold(new BN(Math.ceil(members.length * getTreasuryProposalThreshold(api))));
  }, [api, members]);
  const closeBountyProposal = useRef(closeBounty(index));

  if (!councilMod) {
    return null;
  }

  return /*#__PURE__*/_jsxs(Modal, {
    header: `${t('close bounty')} - "${truncateTitle(description, 30)}"`,
    onClose: toggleOpen,
    size: "large",
    children: [/*#__PURE__*/_jsx(Modal.Content, {
      children: /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The council member that will create the close bounty proposal, submission equates to an "aye" vote.'),
        children: /*#__PURE__*/_jsx(InputAddress, {
          filter: members,
          help: t('Select the council member account you wish to use to create a proposal for closing bounty.'),
          label: t('propose with account'),
          onChange: setAccountId,
          type: "account",
          withLabel: true
        })
      })
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: accountId,
        icon: "ban",
        isDisabled: false,
        label: t('Close Bounty'),
        onStart: toggleOpen,
        params: [threshold, closeBountyProposal.current, closeBountyProposal.current.length],
        tx: api.tx[councilMod].propose
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(CloseBounty);