// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import { useBalance, useBounties } from '@axia-js/app-bounties/hooks';
import { Button, Input, InputAddress, InputBalance, MarkError, Modal, TxButton } from '@axia-js/react-components';
import { useToggle } from '@axia-js/react-hooks';
import { BN_ZERO } from '@axia-js/util';
import { calculateBountyBond, countUtf8Bytes } from "./helpers/index.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const MIN_TITLE_LEN = 1;
const TITLE_DEFAULT_VALUE = '';
const BOUNTY_DEFAULT_VALUE = BN_ZERO;

function BountyCreate() {
  const {
    t
  } = useTranslation();
  const {
    bountyDepositBase,
    bountyValueMinimum,
    dataDepositPerByte,
    maximumReasonLength,
    proposeBounty
  } = useBounties();
  const [accountId, setAccountId] = useState(null);
  const balance = useBalance(accountId);
  const [title, setTitle] = useState('');
  const [bond, setBond] = useState(bountyDepositBase);
  const [value, setValue] = useState(BOUNTY_DEFAULT_VALUE);
  const [isOpen, toggleIsOpen] = useToggle();
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isValueValid, setIsValueValid] = useState(false);
  const [hasFunds, setHasFunds] = useState(false);
  useEffect(() => {
    setIsTitleValid((title === null || title === void 0 ? void 0 : title.length) >= MIN_TITLE_LEN && countUtf8Bytes(title) <= maximumReasonLength);
  }, [maximumReasonLength, title]);
  useEffect(() => {
    setIsValueValid(!!(value !== null && value !== void 0 && value.gte(bountyValueMinimum)));
  }, [bountyValueMinimum, value]);
  useEffect(() => {
    setHasFunds(!!(balance !== null && balance !== void 0 && balance.gte(bond)));
  }, [balance, bond]);
  const isValid = hasFunds && isTitleValid && isValueValid;
  const onTitleChange = useCallback(value => {
    setTitle(value);
    setBond(calculateBountyBond(value, bountyDepositBase, dataDepositPerByte));
  }, [bountyDepositBase, dataDepositPerByte]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "plus",
      isDisabled: false,
      label: t('Add Bounty'),
      onClick: toggleIsOpen
    }), isOpen && /*#__PURE__*/_jsxs(Modal, {
      className: "ui--AddBountyModal",
      header: t('Add Bounty'),
      onClose: toggleIsOpen,
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsxs(Modal.Columns, {
          hint: t('Description of the Bounty (to be stored on-chain)'),
          children: [/*#__PURE__*/_jsx(Input, {
            autoFocus: true,
            defaultValue: TITLE_DEFAULT_VALUE,
            help: t('The description of this bounty'),
            isError: !isTitleValid,
            label: t('bounty title'),
            onChange: onTitleChange,
            value: title
          }), !isTitleValid && title !== TITLE_DEFAULT_VALUE && /*#__PURE__*/_jsx(MarkError, {
            content: t('Title too long')
          })]
        }), /*#__PURE__*/_jsxs(Modal.Columns, {
          hint: t('How much should be paid out for completed Bounty. Upon funding, the amount will be reserved in treasury.'),
          children: [/*#__PURE__*/_jsx(InputBalance, {
            help: t("The total payment amount of this bounty, curator's fee included."),
            isError: !isValueValid,
            isZeroable: true,
            label: t('bounty requested allocation'),
            onChange: setValue,
            value: value
          }), !isValueValid && !(value !== null && value !== void 0 && value.eq(BOUNTY_DEFAULT_VALUE)) && /*#__PURE__*/_jsx(MarkError, {
            content: t('Allocation value is smaller than the minimum bounty value.')
          })]
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('Proposer bond depends on bounty title length.'),
          children: /*#__PURE__*/_jsx(InputBalance, {
            defaultValue: bond.toString(),
            help: t('This amount will be reserved from origin account and returned on approval or slashed upon rejection.'),
            isDisabled: true,
            label: t('bounty bond')
          })
        }), /*#__PURE__*/_jsxs(Modal.Columns, {
          hint: t('This account will propose the bounty. Bond amount will be reserved on its balance.'),
          children: [/*#__PURE__*/_jsx(InputAddress, {
            help: t('Select the account you wish to propose the bounty from.'),
            isError: !hasFunds,
            label: t('submit with account'),
            onChange: setAccountId,
            type: "account",
            withLabel: true
          }), !hasFunds && /*#__PURE__*/_jsx(MarkError, {
            content: t('Account does not have enough funds.')
          })]
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "plus",
          isDisabled: !accountId || !isValid,
          label: t('Add Bounty'),
          onStart: toggleIsOpen,
          params: [value, title],
          tx: proposeBounty
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(BountyCreate);