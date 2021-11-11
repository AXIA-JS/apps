// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { Button, Modal, TxButton } from '@axia-js/react-components';
import { useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import BondPartial from "./partials/Bond.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function NewStash() {
  const {
    t
  } = useTranslation();
  const [isVisible, toggleVisible] = useToggle();
  const [{
    bondTx,
    stashId
  }, setBondInfo] = useState({});

  const _toggle = useCallback(() => {
    setBondInfo({});
    toggleVisible();
  }, [toggleVisible]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "plus",
      label: t('Stash'),
      onClick: _toggle
    }, 'new-stash'), isVisible && /*#__PURE__*/_jsxs(Modal, {
      header: t('Bonding Preferences'),
      onClose: _toggle,
      size: "large",
      children: [/*#__PURE__*/_jsx(Modal.Content, {
        children: /*#__PURE__*/_jsx(BondPartial, {
          onChange: setBondInfo
        })
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: stashId,
          extrinsic: bondTx,
          icon: "sign-in-alt",
          isDisabled: !bondTx || !stashId,
          label: t('Bond'),
          onStart: _toggle
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(NewStash);