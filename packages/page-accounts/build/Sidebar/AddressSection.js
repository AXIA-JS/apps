// Copyright 2017-2021 @axia-js/page-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { AccountName, IdentityIcon, Input } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function AddressSection({
  accountIndex,
  defaultValue,
  editingName,
  flags,
  onChange,
  value
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsxs("div", {
    className: "ui--AddressSection",
    children: [/*#__PURE__*/_jsx(IdentityIcon, {
      size: 80,
      value: value
    }), /*#__PURE__*/_jsxs("div", {
      className: "ui--AddressSection__AddressColumn",
      children: [/*#__PURE__*/_jsx(AccountName, {
        override: editingName ? /*#__PURE__*/_jsx(Input, {
          className: "name--input",
          defaultValue: defaultValue,
          label: "name-input",
          onChange: onChange,
          withLabel: false
        }) : flags.isEditable ? defaultValue.toUpperCase() || t('<unknown>') : undefined,
        value: value,
        withSidebar: false
      }), /*#__PURE__*/_jsx("div", {
        className: "ui--AddressMenu-addr",
        children: value
      }), accountIndex && /*#__PURE__*/_jsxs("div", {
        className: "ui--AddressMenu-index",
        children: [/*#__PURE__*/_jsxs("label", {
          children: [t('index'), ":"]
        }), " ", accountIndex]
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(AddressSection);