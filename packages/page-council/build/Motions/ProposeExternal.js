// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import { getProposalThreshold } from '@axia-js/apps-config';
import { Button, Input, InputAddress, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useCollectiveInstance, useToggle } from '@axia-js/react-hooks';
import { isHex } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function ProposeExternal({
  className = '',
  isMember,
  members
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [isVisible, toggleVisible] = useToggle();
  const [accountId, setAcountId] = useState(null);
  const [{
    proposal,
    proposalLength
  }, setProposal] = useState({
    proposalLength: 0
  });
  const [{
    hash,
    isHashValid
  }, setHash] = useState({
    hash: '',
    isHashValid: false
  });
  const modLocation = useCollectiveInstance('council');
  const threshold = Math.ceil((members.length || 0) * getProposalThreshold(api));

  const _onChangeHash = useCallback(hash => setHash({
    hash,
    isHashValid: isHex(hash, 256)
  }), []);

  useEffect(() => {
    if (isHashValid && hash) {
      const proposal = api.tx.democracy.externalProposeMajority(hash);
      setProposal({
        proposal,
        proposalLength: proposal.encodedLength || 0
      });
    } else {
      setProposal({
        proposal: null,
        proposalLength: 0
      });
    }
  }, [api, hash, isHashValid]);

  if (!modLocation) {
    return null;
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "plus",
      isDisabled: !isMember,
      label: t('Propose external'),
      onClick: toggleVisible
    }), isVisible && /*#__PURE__*/_jsxs(Modal, {
      className: className,
      header: t('Propose external (majority)'),
      onClose: toggleVisible,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The council account for the proposal. The selection is filtered by the current members.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            filter: members,
            help: t('Select the account you wish to make the proposal with.'),
            label: t('propose from account'),
            onChange: setAcountId,
            type: "account",
            withLabel: true
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The hash of the proposal image, either already submitted or valid for the specific call.'),
          children: /*#__PURE__*/_jsx(Input, {
            autoFocus: true,
            help: t('The preimage hash of the proposal'),
            isError: !isHashValid,
            label: t('preimage hash'),
            onChange: _onChangeHash,
            value: hash
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "plus",
          isDisabled: !threshold || !members.includes(accountId || '') || !proposal,
          label: t('Propose'),
          onStart: toggleVisible,
          params: api.tx[modLocation].propose.meta.args.length === 3 ? [threshold, proposal, proposalLength] : [threshold, proposal],
          tx: api.tx[modLocation].propose
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(ProposeExternal);