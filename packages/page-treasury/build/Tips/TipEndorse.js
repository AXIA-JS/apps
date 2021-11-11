// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Button, InputAddress, InputBalance, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function TipEndorse({
  defaultId,
  hash,
  isMember,
  isTipped,
  median,
  members
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [isOpen, toggleOpen] = useToggle();
  const [accountId, setAccountId] = useState(defaultId);
  const [value, setValue] = useState();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "check",
      isDisabled: !isMember,
      label: t('Tip'),
      onClick: toggleOpen
    }), /*#__PURE__*/_jsx(TxButton, {
      accountId: defaultId,
      className: "media--1600",
      icon: "fighter-jet",
      isDisabled: !isMember || !isTipped,
      isIcon: true,
      params: [hash, median],
      tx: (api.tx.tips || api.tx.treasury).tip,
      withoutLink: true
    }), isOpen && /*#__PURE__*/_jsxs(Modal, {
      header: t('Submit tip endorsement'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('Your endorsement will be applied for this account.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            filter: members,
            help: t('Select the account you wish to submit the tip from.'),
            label: t('submit with account'),
            onChange: setAccountId,
            type: "account",
            withLabel: true
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('Allocate a suggested tip amount. With enough endorsements, the suggested values are averaged and sent to the beneficiary.'),
          children: /*#__PURE__*/_jsx(InputBalance, {
            autoFocus: true,
            defaultValue: median,
            help: t('The tip amount that should be allocated'),
            isZeroable: true,
            label: t('value'),
            onChange: setValue
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "plus",
          isDisabled: !accountId,
          label: t('Submit tip'),
          onStart: toggleOpen,
          params: [hash, value],
          tx: (api.tx.tips || api.tx.treasury).tip
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(TipEndorse);