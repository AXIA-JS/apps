// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useState } from 'react';
import { InputAddress, InputBalance, Modal, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { useTranslation } from "../../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Mint({
  className,
  details: {
    issuer,
    minBalance
  },
  id,
  metadata,
  onClose
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [amount, setAmount] = useState(null);
  const [recipientId, setRecipientId] = useState(null);
  const isAmountValid = useMemo(() => amount && amount.gte(minBalance), [amount, minBalance]);
  const [siDecimals, siSymbol] = useMemo(() => [metadata.decimals.toNumber(), metadata.symbol.toUtf8().toUpperCase()], [metadata]);
  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('mint asset'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The recipient account for this minting operation.'),
        children: /*#__PURE__*/_jsx(InputAddress, {
          defaultValue: issuer,
          isDisabled: true,
          label: t('issuer account')
        })
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The recipient account for this minting operation.'),
        children: /*#__PURE__*/_jsx(InputAddress, {
          label: t('mint to address'),
          onChange: setRecipientId,
          type: "allPlus"
        })
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The amount of tokens to issue to the account.'),
        children: /*#__PURE__*/_jsx(InputBalance, {
          autoFocus: true,
          isError: !isAmountValid,
          isZeroable: false,
          label: t('amount to issue'),
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
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: issuer,
        icon: "plus",
        isDisabled: !recipientId || !isAmountValid,
        label: t('Mint'),
        onStart: onClose,
        params: [id, recipientId, amount],
        tx: api.tx.assets.mint
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Mint);