// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import BaseBytes from "./BaseBytes.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Hash160({
  className = '',
  defaultValue,
  isDisabled,
  isError,
  label,
  name,
  onChange,
  onEnter,
  onEscape,
  type,
  withLabel
}) {
  return /*#__PURE__*/_jsx(BaseBytes, {
    asHex: true,
    className: className,
    defaultValue: defaultValue,
    isDisabled: isDisabled,
    isError: isError,
    label: label,
    length: 20,
    name: name,
    onChange: onChange,
    onEnter: onEnter,
    onEscape: onEscape,
    type: type,
    withCopy: isDisabled,
    withLabel: withLabel
  });
}

export default /*#__PURE__*/React.memo(Hash160);