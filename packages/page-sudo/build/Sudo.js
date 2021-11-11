// Copyright 2017-2021 @axia-js/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button, Extrinsic, Icon, InputNumber, Toggle, TxButton } from '@axia-js/react-components';
import { useApi, useToggle } from '@axia-js/react-hooks';
import { BN_ZERO, isFunction } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Sudo({
  className,
  isMine,
  sudoKey
}) {
  const {
    t
  } = useTranslation();
  const {
    api,
    apiDefaultTxSudo
  } = useApi();
  const [withWeight, toggleWithWeight] = useToggle();
  const [method, setMethod] = useState(null);
  const [weight, setWeight] = useState(BN_ZERO);

  const _onChangeExtrinsic = useCallback((method = null) => setMethod(() => method), []);

  const _onChangeWeight = useCallback((weight = BN_ZERO) => setWeight(weight), []);

  return isMine ? /*#__PURE__*/_jsxs("section", {
    className: className,
    children: [/*#__PURE__*/_jsx(Extrinsic, {
      defaultValue: apiDefaultTxSudo,
      label: t('submit the following change'),
      onChange: _onChangeExtrinsic
    }), isFunction(api.tx.sudo.sudoUncheckedWeight) && /*#__PURE__*/_jsx(InputNumber, {
      help: t('The unchecked weight as specified for the sudoUncheckedWeight call.'),
      isDisabled: !withWeight,
      isError: weight.eq(BN_ZERO),
      isZeroable: false,
      label: t('unchecked weight for this call'),
      onChange: _onChangeWeight,
      value: weight,
      children: /*#__PURE__*/_jsx(Toggle, {
        className: "sudoToggle",
        isOverlay: true,
        label: t('with weight override'),
        onChange: toggleWithWeight,
        value: withWeight
      })
    }), /*#__PURE__*/_jsx(Button.Group, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: sudoKey,
        icon: "sign-in-alt",
        isDisabled: !method || (withWeight ? weight.eq(BN_ZERO) : false),
        label: withWeight ? t('Submit Sudo Unchecked') : t('Submit Sudo'),
        params: withWeight ? [method, weight] : [method],
        tx: withWeight ? api.tx.sudo.sudoUncheckedWeight : api.tx.sudo.sudo
      })
    })]
  }) : /*#__PURE__*/_jsx("article", {
    className: "error padded",
    children: /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx(Icon, {
        icon: "ban"
      }), t('You do not have access to the current sudo key')]
    })
  });
}

export default /*#__PURE__*/React.memo(styled(Sudo).withConfig({
  displayName: "Sudo",
  componentId: "sc-1wbms5z-0"
})([".sudoToggle{width:100%;text-align:right;}"]));