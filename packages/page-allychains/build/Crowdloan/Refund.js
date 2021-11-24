// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Button, InputAddress, Modal, TxButton } from '@axia-js/react-components';
import { useAccounts, useApi, useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Refund({
  className,
  paraId
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
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "minus",
      isDisabled: !hasAccounts,
      label: t('Refund'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/_jsxs(Modal, {
      className: className,
      header: t('Withdraw from fund'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/_jsx(Modal.Content, {
        children: /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('This account will be used to send the transaction.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            label: t('requesting from'),
            onChange: setAccountId,
            type: "account",
            value: accountId
          })
        })
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "credit-card",
          label: t('Refund'),
          onStart: toggleOpen,
          params: [paraId],
          tx: api.tx.crowdloan.refund
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Refund);