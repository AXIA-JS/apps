// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { useAccountInfo } from '@axia-js/react-hooks';
import BaseIdentityIcon from '@axia-js/react-identicon';
import IdentityIcon from "./IdentityIcon/index.js";
import Row from "./Row.js";
import { toShortAddress } from "./util/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DEFAULT_ADDR = '5'.padEnd(48, 'x');
const ICON_SIZE = 32;

function AddressRow({
  buttons,
  children,
  className,
  defaultName,
  fullLength = false,
  isContract = false,
  isDisabled,
  isEditableName,
  isInline,
  isValid: propsIsValid,
  overlay,
  value,
  withTags = false
}) {
  const {
    accountIndex,
    isNull,
    name,
    onSaveName,
    onSaveTags,
    setName,
    setTags,
    tags
  } = useAccountInfo(value ? value.toString() : null, isContract);
  const isValid = !isNull && (propsIsValid || value || accountIndex);
  const Icon = value ? IdentityIcon : BaseIdentityIcon;
  const address = value && isValid ? value : DEFAULT_ADDR;
  return /*#__PURE__*/_jsxs(Row, {
    address: fullLength ? address : toShortAddress(address),
    buttons: buttons,
    className: className,
    defaultName: defaultName,
    icon: /*#__PURE__*/_jsx(Icon, {
      size: ICON_SIZE,
      value: value ? value.toString() : null
    }),
    isDisabled: isDisabled,
    isEditableName: isEditableName,
    isEditableTags: true,
    isInline: isInline,
    name: name,
    onChangeName: setName,
    onChangeTags: setTags,
    onSaveName: onSaveName,
    onSaveTags: onSaveTags,
    tags: withTags && tags,
    children: [children, overlay]
  });
}

export { DEFAULT_ADDR, AddressRow };
export default /*#__PURE__*/React.memo(styled(AddressRow).withConfig({
  displayName: "AddressRow",
  componentId: "sc-1ioz9kr-0"
})(["button.u.ui--Icon.editButton{padding:0 .3em .3em .3em;color:#2e86ab;background:none;margin-left:-2em;position:relative;right:-2.3em;z-index:1;}.editSpan{white-space:nowrap;&:before{content:'';}}.ui--AddressRow-balances{display:flex;.column{display:block;label,.result{display:inline-block;vertical-align:middle;}}> span{text-align:left;}}.ui--AddressRow-placeholder{opacity:0.5;}"]));