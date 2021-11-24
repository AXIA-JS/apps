// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styled from 'styled-components';
import Transfer from '@axia-js/app-accounts/modals/Transfer';
import { useTranslation } from '@axia-js/app-accounts/translate';
import { Button } from '@axia-js/react-components';
import { useToggle } from '@axia-js/react-hooks';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function AccountMenuButtons({
  className = '',
  flags,
  isEditing,
  isEditingName,
  onCancel,
  onForgetAddress,
  onSaveName,
  onSaveTags,
  onUpdateName,
  recipientId,
  toggleIsEditingName,
  toggleIsEditingTags
}) {
  const {
    t
  } = useTranslation();
  const [isTransferOpen, toggleIsTransferOpen] = useToggle();

  const _onForgetAddress = useCallback(() => {
    onForgetAddress();
    onUpdateName && onUpdateName();
  }, [onForgetAddress, onUpdateName]);

  const toggleIsEditing = useCallback(() => {
    flags.isEditable && toggleIsEditingName();
    toggleIsEditingTags();
  }, [flags.isEditable, toggleIsEditingName, toggleIsEditingTags]);

  const _onUpdateName = useCallback(() => {
    onSaveName();
    onUpdateName && onUpdateName();
  }, [onSaveName, onUpdateName]);

  const updateName = useCallback(() => {
    if (isEditingName && (flags.isInContacts || flags.isOwned)) {
      _onUpdateName();

      toggleIsEditingName();
    }
  }, [isEditingName, flags.isInContacts, flags.isOwned, _onUpdateName, toggleIsEditingName]);
  const onEdit = useCallback(() => {
    if (isEditing) {
      updateName();
      onSaveTags();
    }

    toggleIsEditing();
  }, [isEditing, toggleIsEditing, updateName, onSaveTags]);
  return /*#__PURE__*/_jsxs("div", {
    className: `${className} ui--AddressMenu-buttons`,
    children: [isEditing ? /*#__PURE__*/_jsxs(Button.Group, {
      children: [/*#__PURE__*/_jsx(Button, {
        icon: "times",
        label: t('Cancel'),
        onClick: onCancel
      }), /*#__PURE__*/_jsx(Button, {
        icon: "save",
        label: t('Save'),
        onClick: onEdit
      })]
    }) : /*#__PURE__*/_jsxs(Button.Group, {
      children: [/*#__PURE__*/_jsx(Button, {
        icon: "paper-plane",
        isDisabled: isEditing,
        label: t('Send'),
        onClick: toggleIsTransferOpen
      }), !flags.isOwned && !flags.isInContacts && /*#__PURE__*/_jsx(Button, {
        icon: "plus",
        isDisabled: isEditing,
        label: t('Save'),
        onClick: _onUpdateName
      }), !flags.isOwned && flags.isInContacts && /*#__PURE__*/_jsx(Button, {
        icon: "ban",
        isDisabled: isEditing,
        label: t('Remove'),
        onClick: _onForgetAddress
      }), /*#__PURE__*/_jsx(Button, {
        icon: "edit",
        label: t('Edit'),
        onClick: onEdit
      })]
    }), isTransferOpen && /*#__PURE__*/_jsx(Transfer, {
      onClose: toggleIsTransferOpen,
      recipientId: recipientId
    }, 'modal-transfer')]
  });
}

export default /*#__PURE__*/React.memo(styled(AccountMenuButtons).withConfig({
  displayName: "AccountMenuButtons",
  componentId: "sc-14qym4-0"
})(["width:100%;.ui--Button-Group{display:flex;flex-direction:row;justify-content:space-around;margin-bottom:0;}"]));