// Copyright 2017-2021 @axia-js/page-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect } from 'react';
import { Tags } from '@axia-js/react-components';
import { useAccountInfo, useOutsideClick } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import AccountMenuButtons from "./AccountMenuButtons.js";
import AddressSection from "./AddressSection.js";
import Flags from "./Flags.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function SidebarEditableSection({
  accountIndex,
  address,
  isBeingEdited,
  onUpdateName,
  sidebarRef
}) {
  const {
    flags,
    isEditing,
    isEditingName,
    isEditingTags,
    name,
    onForgetAddress,
    onSaveName,
    onSaveTags,
    setIsEditingName,
    setIsEditingTags,
    setName,
    setTags,
    tags,
    toggleIsEditingName,
    toggleIsEditingTags
  } = useAccountInfo(address);
  useEffect(() => {
    isBeingEdited(isEditing());
  }, [isBeingEdited, isEditing]);
  const onCancel = useCallback(() => {
    if (isEditing()) {
      try {
        const accountOrAddress = keyring.getAccount(address) || keyring.getAddress(address);
        setName((accountOrAddress === null || accountOrAddress === void 0 ? void 0 : accountOrAddress.meta.name) || '');
        setTags(accountOrAddress !== null && accountOrAddress !== void 0 && accountOrAddress.meta.tags ? accountOrAddress.meta.tags.sort() : []);
        setIsEditingName(false);
        setIsEditingTags(false);
      } catch (error) {// ignore
      }
    }
  }, [isEditing, setName, setTags, setIsEditingName, setIsEditingTags, address]);
  useOutsideClick([sidebarRef], onCancel);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(AddressSection, {
      accountIndex: accountIndex,
      defaultValue: name,
      editingName: isEditingName,
      flags: flags,
      onChange: setName,
      value: address
    }), /*#__PURE__*/_jsx("div", {
      className: "ui--AddressMenu-tags",
      "data-testid": "sidebar-tags",
      children: /*#__PURE__*/_jsx(Tags, {
        isEditable: true,
        isEditing: isEditingTags,
        onChange: setTags,
        size: "tiny",
        value: tags,
        withEditButton: false,
        withTitle: true
      })
    }), /*#__PURE__*/_jsx(Flags, {
      flags: flags
    }), /*#__PURE__*/_jsx(AccountMenuButtons, {
      flags: flags,
      isEditing: isEditing(),
      isEditingName: isEditingName,
      onCancel: onCancel,
      onForgetAddress: onForgetAddress,
      onSaveName: onSaveName,
      onSaveTags: onSaveTags,
      onUpdateName: onUpdateName,
      recipientId: address,
      toggleIsEditingName: toggleIsEditingName,
      toggleIsEditingTags: toggleIsEditingTags
    })]
  });
}

export default /*#__PURE__*/React.memo(SidebarEditableSection);