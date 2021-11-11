// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import CopyButton from "./CopyButton.js";
import Labelled from "./Labelled.js";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

function Output({
  children,
  className = '',
  help,
  isDisabled,
  isError,
  isFull,
  isHidden,
  isMonospace,
  isSmall,
  isTrimmed,
  label,
  labelExtra,
  value,
  withCopy = false,
  withLabel
}) {
  return /*#__PURE__*/_jsxs(Labelled, {
    className: className,
    help: help,
    isFull: isFull,
    isHidden: isHidden,
    isSmall: isSmall,
    label: label,
    labelExtra: labelExtra,
    withLabel: withLabel,
    children: [/*#__PURE__*/_jsxs("div", {
      className: `ui--output ui dropdown selection ${isError ? ' error' : ''}${isMonospace ? ' monospace' : ''}${isDisabled ? ' disabled' : ''}`,
      children: [isTrimmed && value && value.length > 256 ? `${value.substr(0, 96)}…${value.substr(-96)}` : value, children]
    }), withCopy && /*#__PURE__*/_jsx(CopyButton, {
      value: value
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Output).withConfig({
  displayName: "Output",
  componentId: "sc-1mdjydk-0"
})(["pre{margin:0;overflow:hidden;text-overflow:ellipsis;}"]));