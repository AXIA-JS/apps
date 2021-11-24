// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import CopyButton from "./CopyButton.js";
import Labelled from "./Labelled.js";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

function Static({
  children,
  className = '',
  defaultValue,
  help,
  isFull,
  isHidden,
  isSmall,
  label,
  value,
  withCopy,
  withLabel
}) {
  return /*#__PURE__*/_jsxs(Labelled, {
    className: className,
    help: help,
    isFull: isFull,
    isHidden: isHidden,
    isSmall: isSmall,
    label: label,
    withLabel: withLabel,
    children: [/*#__PURE__*/_jsxs("div", {
      className: "ui--Static ui dropdown selection disabled",
      children: [value || defaultValue, children]
    }), withCopy && /*#__PURE__*/_jsx(CopyButton, {
      value: value || defaultValue
    })]
  });
}

export default /*#__PURE__*/React.memo(Static);