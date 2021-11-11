// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Modal, TxButton } from '@axia-js/react-components';
import { useTranslation } from "../../translate.js";
import SessionKeyPartital from "../partials/SessionKey.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function SetSessionKey({
  controllerId,
  onClose,
  stashId
}) {
  const {
    t
  } = useTranslation();
  const [{
    sessionTx
  }, setTx] = useState({});
  return /*#__PURE__*/_jsxs(Modal, {
    header: t('Set Session Key'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsx(Modal.Content, {
      children: /*#__PURE__*/_jsx(SessionKeyPartital, {
        controllerId: controllerId,
        onChange: setTx,
        stashId: stashId,
        withFocus: true,
        withSenders: true
      })
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: controllerId,
        extrinsic: sessionTx,
        icon: "sign-in-alt",
        isDisabled: !sessionTx,
        label: t('Set Session Key'),
        onStart: onClose
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(SetSessionKey);