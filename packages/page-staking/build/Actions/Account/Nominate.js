// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, TxButton } from '@axia-js/react-components';
import { useTranslation } from "../../translate.js";
import NominatePartial from "../partials/Nominate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Nominate({
  className = '',
  controllerId,
  nominating,
  onClose,
  stashId,
  targets
}) {
  const {
    t
  } = useTranslation();
  const [{
    nominateTx
  }, setTx] = useState({});
  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Nominate Validators'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsx(Modal.Content, {
      children: /*#__PURE__*/_jsx(NominatePartial, {
        className: "nominatePartial",
        controllerId: controllerId,
        nominating: nominating,
        onChange: setTx,
        stashId: stashId,
        targets: targets,
        withSenders: true
      })
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: controllerId,
        extrinsic: nominateTx,
        icon: "hand-paper",
        isDisabled: !nominateTx,
        label: t('Nominate'),
        onStart: onClose
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Nominate).withConfig({
  displayName: "Nominate",
  componentId: "sc-ndzjtz-0"
})([".nominatePartial{.ui--Static .ui--AddressMini .ui--AddressMini-info{max-width:10rem;min-width:10rem;}}"]));