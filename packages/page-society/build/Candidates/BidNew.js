// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { InputAddress, InputBalance, Modal, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function BidNew({
  onClose
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [amount, setAmount] = useState();
  const [accountId, setAccount] = useState();
  return /*#__PURE__*/_jsxs(Modal, {
    header: t('Bid to join'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('Your candidate/bid account. Once accepted this account will become a member.'),
        children: /*#__PURE__*/_jsx(InputAddress, {
          help: t('The actual account you wish to submit the bid with'),
          label: t('bid account'),
          onChange: setAccount,
          type: "account"
        })
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The amount to tie to your bid. The lowest bidder moves forward.'),
        children: /*#__PURE__*/_jsx(InputBalance, {
          autoFocus: true,
          help: t('The amount to associate with your bid, should be less than the pot.'),
          label: t('bid amount'),
          onChange: setAmount
        })
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: accountId,
        icon: "sign-in-alt",
        isDisabled: !amount,
        label: t('Bid'),
        onStart: onClose,
        params: [amount],
        tx: api.tx.society.bid
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(BidNew);