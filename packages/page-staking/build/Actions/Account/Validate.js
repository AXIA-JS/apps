// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Modal, TxButton } from '@axia-js/react-components';
import { useTranslation } from "../../translate.js";
import ValidatePartial from "../partials/Validate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Validate({
  controllerId,
  onClose,
  stashId
}) {
  const {
    t
  } = useTranslation();
  const [{
    validateTx
  }, setTx] = useState({});
  return /*#__PURE__*/_jsxs(Modal, {
    header: t('Set validator preferences'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsx(Modal.Content, {
      children: /*#__PURE__*/_jsx(ValidatePartial, {
        controllerId: controllerId,
        onChange: setTx,
        stashId: stashId,
        withFocus: true,
        withSenders: true
      })
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: controllerId,
        extrinsic: validateTx,
        icon: "certificate",
        isDisabled: !validateTx,
        label: t('Validate'),
        onStart: onClose
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Validate);