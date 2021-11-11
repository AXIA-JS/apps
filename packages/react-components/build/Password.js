// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import Input from "./Input.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Password({
  autoFocus,
  children,
  className = '',
  defaultValue,
  help,
  isDisabled,
  isError,
  isFull,
  label,
  labelExtra,
  name,
  onChange,
  onEnter,
  onEscape,
  tabIndex,
  value,
  withLabel
}) {
  return /*#__PURE__*/_jsx(Input, {
    autoFocus: autoFocus,
    className: `ui--Password ${className}`,
    defaultValue: defaultValue,
    help: help,
    isDisabled: isDisabled,
    isError: isError,
    isFull: isFull,
    label: label,
    labelExtra: labelExtra,
    name: name,
    onChange: onChange,
    onEnter: onEnter,
    onEscape: onEscape,
    tabIndex: tabIndex,
    type: "password",
    value: value,
    withLabel: withLabel,
    children: children
  });
}

export default /*#__PURE__*/React.memo(Password);