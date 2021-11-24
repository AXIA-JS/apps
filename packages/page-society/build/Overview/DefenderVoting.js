// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef, useState } from 'react';
import { Button, Dropdown, InputAddress, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function DefenderVoting({
  isMember,
  ownMembers
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [isVisible, toggleVisible] = useToggle();
  const [vote, setVote] = useState(true);
  const [accountId, setAccountId] = useState(null);
  const voteOptsRef = useRef([{
    text: t('Aye, I approve'),
    value: true
  }, {
    text: t('Nay, I do not approve'),
    value: false
  }]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isVisible && /*#__PURE__*/_jsxs(Modal, {
      header: t('Vote for defender'),
      onClose: toggleVisible,
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(InputAddress, {
          filter: ownMembers,
          help: t('The address to vote from (must be a member)'),
          label: t('vote from account'),
          onChange: setAccountId
        }), /*#__PURE__*/_jsx(Dropdown, {
          help: t('Approve or reject this defender.'),
          label: t('vote for defender'),
          onChange: setVote,
          options: voteOptsRef.current,
          value: vote
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "check",
          label: t('Vote'),
          onStart: toggleVisible,
          params: [vote],
          tx: api.tx.society.defenderVote
        })
      })]
    }), /*#__PURE__*/_jsx(Button, {
      icon: "check",
      isDisabled: !isMember,
      label: t('Vote'),
      onClick: toggleVisible
    })]
  });
}

export default /*#__PURE__*/React.memo(DefenderVoting);