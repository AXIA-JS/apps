// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Button, MarkWarning, Modal, ProposedAction, TxButton, VoteAccount } from '@axia-js/react-components';
import { useAccounts, useApi, useCollectiveInstance, useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Voting({
  hash,
  idNumber,
  isDisabled,
  members,
  prime,
  proposal
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    hasAccounts
  } = useAccounts();
  const [isVotingOpen, toggleVoting] = useToggle();
  const [accountId, setAccountId] = useState(null);
  const modLocation = useCollectiveInstance('council');

  if (!hasAccounts || !modLocation) {
    return null;
  }

  const isPrime = (prime === null || prime === void 0 ? void 0 : prime.toString()) === accountId;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isVotingOpen && /*#__PURE__*/_jsxs(Modal, {
      header: t('Vote on proposal'),
      onClose: toggleVoting,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The proposal that is being voted on. It will pass when the threshold is reached.'),
          children: /*#__PURE__*/_jsx(ProposedAction, {
            idNumber: idNumber,
            proposal: proposal
          })
        }), /*#__PURE__*/_jsxs(Modal.Columns, {
          hint: t('The council account for this vote. The selection is filtered by the current members.'),
          children: [/*#__PURE__*/_jsx(VoteAccount, {
            filter: members,
            onChange: setAccountId
          }), isPrime && /*#__PURE__*/_jsx(MarkWarning, {
            content: t('You are voting with this collective\'s prime account. The vote will be the default outcome in case of any abstentions.')
          })]
        })]
      }), /*#__PURE__*/_jsxs(Modal.Actions, {
        children: [/*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "ban",
          isDisabled: isDisabled,
          label: t('Vote Nay'),
          onStart: toggleVoting,
          params: [hash, idNumber, false],
          tx: api.tx[modLocation].vote
        }), /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "check",
          isDisabled: isDisabled,
          label: t('Vote Aye'),
          onStart: toggleVoting,
          params: [hash, idNumber, true],
          tx: api.tx[modLocation].vote
        })]
      })]
    }), /*#__PURE__*/_jsx(Button, {
      icon: "check",
      isDisabled: isDisabled,
      label: t('Vote'),
      onClick: toggleVoting
    })]
  });
}

export default /*#__PURE__*/React.memo(Voting);