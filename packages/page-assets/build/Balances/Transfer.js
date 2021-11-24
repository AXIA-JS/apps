// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Button, InputAddress, InputBalance, Modal, Toggle, TxButton } from '@axia-js/react-components';
import { useApi, useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Transfer({
  accountId,
  assetId,
  className,
  minBalance,
  siFormat: [siDecimals, siSymbol]
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [isOpen, toggleOpen] = useToggle();
  const [amount, setAmount] = useState(null);
  const [recipientId, setRecipientId] = useState(null);
  const [isProtected, setIsProtected] = useState(true);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "paper-plane",
      label: t('send'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/_jsxs(Modal, {
      className: className,
      header: t('transfer asset'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The account to transfer from. This account should have sufficient assets for this transfer.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            defaultValue: accountId,
            isDisabled: true,
            label: t('send from')
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The beneficiary will have access to the transferred asset when the transaction is included in a block.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            label: t('send to address'),
            onChange: setRecipientId,
            type: "allPlus"
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The amount of tokens to transfer to the account.'),
          children: /*#__PURE__*/_jsx(InputBalance, {
            autoFocus: true,
            label: t('amount to transfer'),
            onChange: setAmount,
            siDecimals: siDecimals,
            siSymbol: siSymbol
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The minimum balance allowed for the asset.'),
          children: /*#__PURE__*/_jsx(InputBalance, {
            defaultValue: minBalance,
            isDisabled: true,
            label: t('minimum balance'),
            siDecimals: siDecimals,
            siSymbol: siSymbol
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('With the keep-alive option set, the account is protected against removal due to low balances.'),
          children: /*#__PURE__*/_jsx(Toggle, {
            className: "typeToggle",
            label: isProtected ? t('Transfer with account keep-alive checks') : t('Normal transfer without keep-alive checks'),
            onChange: setIsProtected,
            value: isProtected
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "paper-plane",
          isDisabled: !recipientId || !amount,
          label: t('Send'),
          onStart: toggleOpen,
          params: [assetId, recipientId, amount],
          tx: isProtected ? api.tx.assets.transferKeepAlive : api.tx.assets.transfer
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Transfer);