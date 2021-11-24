// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useCallback, useEffect, useState } from 'react';
import { getProposalThreshold } from '@axia-js/apps-config';
import { Button, Extrinsic, InputAddress, InputNumber, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useCollectiveInstance, useToggle } from '@axia-js/react-hooks';
import { BN_ZERO } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Propose({
  isMember,
  members
}) {
  const {
    t
  } = useTranslation();
  const {
    api,
    apiDefaultTxSudo
  } = useApi();
  const [isOpen, toggleOpen] = useToggle();
  const [accountId, setAcountId] = useState(null);
  const [{
    proposal,
    proposalLength
  }, setProposal] = useState({
    proposalLength: 0
  });
  const [{
    isThresholdValid,
    threshold
  }, setThreshold] = useState({
    isThresholdValid: false
  });
  const modLocation = useCollectiveInstance('council');
  useEffect(() => {
    members && setThreshold({
      isThresholdValid: members.length !== 0,
      threshold: new BN(Math.ceil(members.length * getProposalThreshold(api)))
    });
  }, [api, members]);

  const _setMethod = useCallback(proposal => setProposal({
    proposal,
    proposalLength: (proposal === null || proposal === void 0 ? void 0 : proposal.encodedLength) || 0
  }), []);

  const _setThreshold = useCallback(threshold => setThreshold({
    isThresholdValid: !!(threshold !== null && threshold !== void 0 && threshold.gtn(0)),
    threshold
  }), []);

  if (!modLocation) {
    return null;
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "plus",
      isDisabled: !isMember,
      label: t('Propose motion'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/_jsxs(Modal, {
      header: t('Propose a council motion'),
      onClose: toggleOpen,
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
          hint: t('The desired threshold. Here set to a default of 50%+1, as applicable for general proposals.'),
          children: /*#__PURE__*/_jsx(InputNumber, {
            className: "medium",
            help: t('The minimum number of council votes required to approve this motion'),
            isError: !threshold || threshold.eqn(0) || threshold.gtn(members.length),
            label: t('threshold'),
            onChange: _setThreshold,
            placeholder: t('Positive number between 1 and {{memberCount}}', {
              replace: {
                memberCount: members.length
              }
            }),
            value: threshold || BN_ZERO
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The actual proposal to make, based on the selected call and parameters thereof.'),
          children: /*#__PURE__*/_jsx(Extrinsic, {
            defaultValue: apiDefaultTxSudo,
            label: t('proposal'),
            onChange: _setMethod
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          isDisabled: !proposal || !isThresholdValid,
          label: t('Propose'),
          onStart: toggleOpen,
          params: api.tx[modLocation].propose.meta.args.length === 3 ? [threshold, proposal, proposalLength] : [threshold, proposal],
          tx: api.tx[modLocation].propose
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Propose);