// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext } from 'react';
import { Button, ErrorBoundary, Modal, StatusContext } from '@axia-js/react-components';
import { useToggle } from '@axia-js/react-hooks';
import Transaction from "./Transaction.js";
import { useTranslation } from "./translate.js";
import { handleTxResults } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

async function send(queueSetTxStatus, currentItem, tx) {
  currentItem.txStartCb && currentItem.txStartCb();

  try {
    const unsubscribe = await tx.send(handleTxResults('send', queueSetTxStatus, currentItem, () => {
      unsubscribe();
    }));
  } catch (error) {
    console.error('send: error:', error);
    queueSetTxStatus(currentItem.id, 'error', {}, error);
    currentItem.txFailedCb && currentItem.txFailedCb(null);
  }
}

function TxUnsigned({
  className,
  currentItem
}) {
  const {
    t
  } = useTranslation();
  const {
    queueSetTxStatus
  } = useContext(StatusContext);
  const [isRenderError, toggleRenderError] = useToggle();

  const _onSend = useCallback(async () => {
    if (currentItem.extrinsic) {
      await send(queueSetTxStatus, currentItem, currentItem.extrinsic);
    }
  }, [currentItem, queueSetTxStatus]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Modal.Content, {
      className: className,
      children: /*#__PURE__*/_jsx(ErrorBoundary, {
        onError: toggleRenderError,
        children: /*#__PURE__*/_jsx(Transaction, {
          currentItem: currentItem,
          onError: toggleRenderError
        })
      })
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "sign-in-alt",
        isDisabled: isRenderError,
        label: t('Submit (no signature)'),
        onClick: _onSend,
        tabIndex: 2
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(TxUnsigned);