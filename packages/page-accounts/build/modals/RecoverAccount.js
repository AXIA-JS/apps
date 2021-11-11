// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { InputAddress, Modal, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function RecoverAccount({
  address,
  className = '',
  onClose
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [recover, setRecover] = useState(null);
  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Initiate account recovery'),
    onClose: onClose,
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(InputAddress, {
        isDisabled: true,
        label: t('the account to recover to'),
        value: address
      }), /*#__PURE__*/_jsx(InputAddress, {
        help: t('Select the account you wish to recover into this account.'),
        label: t('recover this account'),
        onChange: setRecover,
        type: "allPlus"
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: address,
        icon: "recycle",
        isDisabled: !recover || recover === address,
        label: t('Start recovery'),
        onStart: onClose,
        params: [recover],
        tx: api.tx.recovery.initiateRecovery
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(RecoverAccount);