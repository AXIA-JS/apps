// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import IdentityIcon from "./IdentityIcon/index.js";
import Input from "./Input.js";
import { toAddress } from "./util/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function InputAddressSimple({
  autoFocus,
  children,
  className = '',
  defaultValue,
  help,
  isError,
  isFull,
  label,
  onChange,
  onEnter,
  onEscape
}) {
  const [address, setAddress] = useState(defaultValue || null);

  const _onChange = useCallback(_address => {
    const address = toAddress(_address) || null;
    setAddress(address);
    onChange && onChange(address);
  }, [onChange]);

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Input, {
      autoFocus: autoFocus,
      defaultValue: defaultValue,
      help: help,
      isError: isError || !address,
      isFull: isFull,
      label: label,
      onChange: _onChange,
      onEnter: onEnter,
      onEscape: onEscape,
      children: children
    }), /*#__PURE__*/_jsx(IdentityIcon, {
      className: "ui--InputAddressSimpleIcon",
      size: 32,
      value: address
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(InputAddressSimple).withConfig({
  displayName: "InputAddressSimple",
  componentId: "sc-1gpwsra-0"
})(["position:relative;.ui--InputAddressSimpleIcon{background:#eee;border:1px solid #888;border-radius:50%;left:0.75rem;position:absolute;top:1rem;}"]));