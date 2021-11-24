// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Button, InputAddress, InputBalance, Modal, ProposedAction, TxButton } from '@axia-js/react-components';
import { useAccounts, useApi, useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Seconding({
  deposit,
  depositors,
  image,
  proposalId
}) {
  const {
    t
  } = useTranslation();
  const {
    hasAccounts
  } = useAccounts();
  const {
    api
  } = useApi();
  const [accountId, setAccountId] = useState(null);
  const [isSecondingOpen, toggleSeconding] = useToggle();

  if (!hasAccounts) {
    return null;
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isSecondingOpen && /*#__PURE__*/_jsxs(Modal, {
      header: t('Second proposal'),
      onClose: toggleSeconding,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The proposal is in the queue for future referendums. One proposal from this list will move forward to voting.'),
          children: /*#__PURE__*/_jsx(ProposedAction, {
            idNumber: proposalId,
            proposal: image === null || image === void 0 ? void 0 : image.proposal
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('Seconding a proposal that indicates your backing for the proposal. Proposals with greater interest moves up the queue for potential next referendums.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            help: t('Select the account you wish to second with. This will lock your funds until the proposal is either approved or rejected'),
            label: t('second with account'),
            onChange: setAccountId,
            type: "account",
            withLabel: true
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The deposit will be locked for the lifetime of the proposal.'),
          children: /*#__PURE__*/_jsx(InputBalance, {
            isDisabled: true,
            label: t('deposit required'),
            value: deposit || api.consts.democracy.minimumDeposit
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "sign-in-alt",
          isDisabled: !accountId,
          label: t('Second'),
          onStart: toggleSeconding,
          params: api.tx.democracy.second.meta.args.length === 2 ? [proposalId, depositors.length] : [proposalId],
          tx: api.tx.democracy.second
        })
      })]
    }), /*#__PURE__*/_jsx(Button, {
      icon: "toggle-off",
      label: t('Second'),
      onClick: toggleSeconding
    })]
  });
}

export default /*#__PURE__*/React.memo(Seconding);