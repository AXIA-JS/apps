// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Button, MarkWarning, Modal, TxButton, VoteAccount } from '@axia-js/react-components';
import { useAccounts, useApi, useCollectiveInstance, useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Voting({
  hash,
  members,
  prime,
  proposalId,
  type
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
  const [accountId, setAccountId] = useState(null);
  const [isVotingOpen, toggleVoting] = useToggle();
  const modLocation = useCollectiveInstance(type);

  if (!modLocation || !hasAccounts) {
    return null;
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isVotingOpen && /*#__PURE__*/_jsxs(Modal, {
      header: t('Vote on proposal'),
      onClose: toggleVoting,
      size: "small",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(VoteAccount, {
          filter: members,
          onChange: setAccountId
        }), accountId === (prime === null || prime === void 0 ? void 0 : prime.toString()) && /*#__PURE__*/_jsx(MarkWarning, {
          content: t('You are voting with this collective\'s prime account. The vote will be the default outcome in case of any abstentions.')
        })]
      }), /*#__PURE__*/_jsxs(Modal.Actions, {
        children: [/*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "ban",
          label: t('Vote Nay'),
          onStart: toggleVoting,
          params: [hash, proposalId, false],
          tx: api.tx[modLocation].vote
        }), /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "check",
          label: t('Vote Aye'),
          onStart: toggleVoting,
          params: [hash, proposalId, true],
          tx: api.tx[modLocation].vote
        })]
      })]
    }), /*#__PURE__*/_jsx(Button, {
      icon: "check",
      label: t('Vote'),
      onClick: toggleVoting
    })]
  });
}

export default /*#__PURE__*/React.memo(Voting);