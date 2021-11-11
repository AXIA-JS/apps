// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useState } from 'react';
import { Button, Input, InputAddress, InputBalance, MarkWarning, Modal, TxButton } from '@axia-js/react-components';
import { useAccounts, useApi, useToggle } from '@axia-js/react-hooks';
import { formatBalance, isHex } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
// 0x, <enum byte>, hex data
const VALID_LENGTHS = [2 + 2 + 64 * 2, 2 + 2 + 65 * 2];

function verifySignature(api, signature) {
  if (isHex(signature) && VALID_LENGTHS.includes(signature.length)) {
    try {
      api.createType('MultiSignature', signature);
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  return false;
}

function Contribute({
  cap,
  className,
  needsSignature,
  paraId,
  raised
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
  const [isOpen, toggleOpen] = useToggle();
  const [accountId, setAccountId] = useState(null);
  const [amount, setAmount] = useState();
  const [signature, setSignature] = useState(null);
  const isSignatureError = useMemo(() => needsSignature && !verifySignature(api, signature), [api, needsSignature, signature]);
  const remaining = cap.sub(raised);
  const isAmountBelow = !amount || amount.lt(api.consts.crowdloan.minContribution);
  const isAmountOver = !!(amount && amount.gt(remaining));
  const isAmountError = isAmountBelow || isAmountOver;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "plus",
      isDisabled: !hasAccounts,
      label: t('Contribute'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/_jsxs(Modal, {
      className: className,
      header: t('Contribute to fund'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('This account will contribute to the crowdloan.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            label: t('contribute from'),
            onChange: setAccountId,
            type: "account",
            value: accountId
          })
        }), /*#__PURE__*/_jsxs(Modal.Columns, {
          hint: t('The amount to contribute from this account.'),
          children: [/*#__PURE__*/_jsx(InputBalance, {
            autoFocus: true,
            defaultValue: api.consts.crowdloan.minContribution,
            isError: isAmountError,
            isZeroable: false,
            label: t('contribution'),
            onChange: setAmount
          }), isAmountBelow && /*#__PURE__*/_jsx(MarkWarning, {
            content: t('The amount is less than the minimum allowed contribution of {{value}}', {
              replace: {
                value: formatBalance(api.consts.crowdloan.minContribution)
              }
            })
          }), isAmountOver && /*#__PURE__*/_jsx(MarkWarning, {
            content: t('The amount is more than the remaining contribution needed {{value}}', {
              replace: {
                value: formatBalance(remaining)
              }
            })
          })]
        }), needsSignature && /*#__PURE__*/_jsxs(Modal.Columns, {
          hint: t('The verifier signature that is to be associated with this contribution.'),
          children: [/*#__PURE__*/_jsx(Input, {
            isError: isSignatureError,
            label: t('verifier signature'),
            onChange: setSignature,
            placeholder: t('0x...')
          }), isSignatureError && /*#__PURE__*/_jsx(MarkWarning, {
            content: t('The hex-encoded verifier signature should be provided to you by the team running the crowdloan (based on the information you provide).')
          })]
        }), /*#__PURE__*/_jsxs(Modal.Columns, {
          hint: t('The above contribution should more than minimum contribution amount and less than the remaining value.'),
          children: [/*#__PURE__*/_jsx(InputBalance, {
            defaultValue: api.consts.crowdloan.minContribution,
            isDisabled: true,
            label: t('minimum allowed')
          }), /*#__PURE__*/_jsx(InputBalance, {
            defaultValue: remaining,
            isDisabled: true,
            label: t('remaining till cap')
          })]
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "plus",
          isDisabled: isAmountError || isSignatureError,
          label: t('Contribute'),
          onStart: toggleOpen,
          params: [paraId, amount, signature],
          tx: api.tx.crowdloan.contribute
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Contribute);