// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { InputAddress, Modal, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Undelegate({
  accountDelegating,
  onClose
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  return /*#__PURE__*/_jsxs(Modal, {
    className: "staking--Undelegate",
    header: t('Undelegate'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsx(Modal.Content, {
      children: /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('You will remove any delegation made by this acccount'),
        children: /*#__PURE__*/_jsx(InputAddress, {
          defaultValue: accountDelegating,
          isDisabled: true,
          label: t('delegating account')
        })
      })
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: accountDelegating,
        icon: "sign-in-alt",
        label: t('Undelegate'),
        onStart: onClose,
        tx: api.tx.democracy.undelegate
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Undelegate);