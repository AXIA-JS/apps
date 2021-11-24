// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { InputAddress, InputBalance, InputNumber, Modal, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function RegisterId({
  className,
  nextParaId,
  onClose
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [accountId, setAccountId] = useState(null);
  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Reserve ParaId'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('This account will be used to the Id reservation and for the future parathread.'),
        children: /*#__PURE__*/_jsx(InputAddress, {
          label: t('reserve from'),
          onChange: setAccountId,
          type: "account",
          value: accountId
        })
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The Id of this allychain as known on the network (selected from nextFreeId)'),
        children: /*#__PURE__*/_jsx(InputNumber, {
          defaultValue: nextParaId,
          isDisabled: true,
          label: t('allychain id')
        })
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The reservation fee for this Id'),
        children: /*#__PURE__*/_jsx(InputBalance, {
          defaultValue: api.consts.registrar.paraDeposit,
          isDisabled: true,
          label: t('reserved deposit')
        })
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: accountId,
        icon: "plus",
        isDisabled: !nextParaId,
        onStart: onClose,
        params: [],
        tx: api.tx.registrar.reserve
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(RegisterId);