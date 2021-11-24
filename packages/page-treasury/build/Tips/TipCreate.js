// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { Button, Input, InputAddress, InputBalance, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const MAX_REASON_LEN = 128;
const MIN_REASON_LEN = 5;

function TipCreate({
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
  const [beneficiary, setBeneficiary] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [reason, setReason] = useState('');
  const [value, setValue] = useState();
  const hasValue = value === null || value === void 0 ? void 0 : value.gtn(0);
  const hasReason = (reason === null || reason === void 0 ? void 0 : reason.length) >= MIN_REASON_LEN && (reason === null || reason === void 0 ? void 0 : reason.length) <= MAX_REASON_LEN;
  useEffect(() => {
    setIsMember(members.includes(accountId || ''));
  }, [accountId, members]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "plus",
      label: t('Propose tip'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/_jsxs(Modal, {
      header: t('Submit tip request'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('Use this account to request the tip from. This can be a normal or council account.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            help: t('Select the account you wish to submit the tip from.'),
            label: t('submit with account'),
            onChange: setAccountId,
            type: "account",
            withLabel: true
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The beneficiary will received the tip as approved by council members.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            help: t('The account to which the tip will be transferred if approved'),
            label: t('beneficiary'),
            onChange: setBeneficiary,
            type: "allPlus"
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('A reason (to be stored-on-chain) as to why the recipient deserves a tip payout.'),
          children: /*#__PURE__*/_jsx(Input, {
            autoFocus: true,
            help: t('The reason why this tip should be paid.'),
            isError: !hasReason,
            label: t('tip reason'),
            onChange: setReason
          })
        }), isMember && /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('As a council member, you can suggest an initial value for the tip, each other council member can suggest their own.'),
          children: /*#__PURE__*/_jsx(InputBalance, {
            help: t('The suggested value for this tip'),
            isError: !hasValue,
            label: t('tip value'),
            onChange: setValue
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "plus",
          isDisabled: !accountId || isMember && !hasValue || !hasReason,
          label: t('Propose tip'),
          onStart: toggleOpen,
          params: isMember ? [reason, beneficiary, value] : [reason, beneficiary],
          tx: isMember ? (api.tx.tips || api.tx.treasury).tipNew : (api.tx.tips || api.tx.treasury).reportAwesome
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(TipCreate);