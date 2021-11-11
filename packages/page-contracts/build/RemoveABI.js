// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import { Button, Modal } from '@axia-js/react-components';
import CodeRow from "./shared/CodeRow.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function RemoveABI({
  code,
  onClose,
  onRemove
}) {
  const {
    t
  } = useTranslation();

  const _onRemove = useCallback(() => {
    onClose && onClose();
    onRemove();
  }, [onClose, onRemove]);

  return /*#__PURE__*/_jsxs(Modal, {
    className: "app--accounts-Modal",
    header: t('Confirm ABI removal'),
    onClose: onClose,
    children: [/*#__PURE__*/_jsx(Modal.Content, {
      children: /*#__PURE__*/_jsxs(CodeRow, {
        code: code,
        isInline: true,
        children: [/*#__PURE__*/_jsx("p", {
          children: t('You are about to remove this code\'s ABI. Once completed, should you need to access it again, you will have to manually re-upload it.')
        }), /*#__PURE__*/_jsx("p", {
          children: t('This operation does not impact the associated on-chain code or any of its contracts.')
        })]
      })
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "trash",
        label: t('Remove'),
        onClick: _onRemove
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(RemoveABI);