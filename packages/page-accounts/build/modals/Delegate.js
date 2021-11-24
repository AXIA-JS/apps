// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { ConvictionDropdown, InputAddress, InputBalance, Modal, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { BalanceFree } from '@axia-js/react-query';
import { BN_ZERO } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import ValidateAmount from "./InputValidateAmount.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Delegate({
  onClose,
  previousAmount,
  previousConviction,
  previousDelegatedAccount,
  previousDelegatingAccount
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [amountError, setAmountError] = useState(null);
  const [maxBalance] = useState();
  const [amount, setAmount] = useState(previousAmount);
  const [delegatingAccount, setDelegatingAccount] = useState(previousDelegatingAccount || null);
  const [delegatedAccount, setDelegatedAccount] = useState(previousDelegatedAccount || null);
  const defaultConviction = previousConviction === undefined ? 0 : previousConviction.toNumber();
  const [conviction, setConviction] = useState(defaultConviction);
  const isDirty = (amount === null || amount === void 0 ? void 0 : amount.toString()) !== (previousAmount === null || previousAmount === void 0 ? void 0 : previousAmount.toString()) || delegatedAccount !== previousDelegatedAccount || delegatingAccount !== previousDelegatingAccount || conviction !== (previousConviction === null || previousConviction === void 0 ? void 0 : previousConviction.toNumber());
  return /*#__PURE__*/_jsxs(Modal, {
    className: "staking--Delegate",
    header: previousDelegatedAccount ? t('democracy vote delegation') : t('delegate democracy vote'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsxs(Modal.Columns, {
        hint: /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx("p", {
            children: t('Any democracy vote performed by the delegated account will result in an additional vote from the delegating account')
          }), /*#__PURE__*/_jsx("p", {
            children: t('If the delegated account is currently voting in a referendum, the delegating vote and conviction will be added.')
          })]
        }),
        children: [/*#__PURE__*/_jsx(InputAddress, {
          label: t('delegating account'),
          onChange: setDelegatingAccount,
          type: "account",
          value: delegatingAccount
        }), /*#__PURE__*/_jsx(InputAddress, {
          label: t('delegated account'),
          onChange: setDelegatedAccount,
          type: "account",
          value: delegatedAccount
        })]
      }), /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('The amount to allocate and the conviction that will be applied to all votes made on a referendum.'),
        children: [/*#__PURE__*/_jsx(InputBalance, {
          autoFocus: true,
          help: t('Amount to delegate for any democracy vote. This is adjusted using the available funds on the account.'),
          isError: !!(amountError !== null && amountError !== void 0 && amountError.error),
          isZeroable: false,
          label: t('delegating amount'),
          labelExtra: /*#__PURE__*/_jsx(BalanceFree, {
            label: /*#__PURE__*/_jsx("span", {
              className: "label",
              children: t('balance')
            }),
            params: delegatingAccount
          }),
          maxValue: maxBalance,
          onChange: setAmount,
          value: amount
        }), /*#__PURE__*/_jsx(ValidateAmount, {
          amount: amount,
          delegatingAccount: delegatingAccount,
          onError: setAmountError
        }), /*#__PURE__*/_jsx(ConvictionDropdown, {
          help: t('The conviction that will be used for each delegated vote.'),
          label: t('conviction'),
          onChange: setConviction,
          value: conviction
        })]
      })]
    }), /*#__PURE__*/_jsxs(Modal.Actions, {
      children: [previousDelegatedAccount && /*#__PURE__*/_jsx(TxButton, {
        accountId: delegatingAccount,
        icon: "trash-alt",
        label: t('Undelegate'),
        onStart: onClose,
        tx: api.tx.democracy.undelegate
      }), /*#__PURE__*/_jsx(TxButton, {
        accountId: delegatingAccount,
        icon: "sign-in-alt",
        isDisabled: !(amount !== null && amount !== void 0 && amount.gt(BN_ZERO)) || !!(amountError !== null && amountError !== void 0 && amountError.error) || !isDirty,
        label: previousDelegatedAccount ? t('Save delegation') : t('Delegate'),
        onStart: onClose,
        params: [delegatedAccount, conviction, amount],
        tx: api.tx.democracy.delegate
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Delegate);