// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function SummaryBox({
  children,
  className = '',
  isSmall
}) {
  return /*#__PURE__*/_jsx("div", {
    className: `${className}${isSmall ? ' isSmall' : ''}`,
    children: children
  });
}

export default /*#__PURE__*/React.memo(styled(SummaryBox).withConfig({
  displayName: "SummaryBox",
  componentId: "sc-1oyq085-0"
})(["align-items:stretch;border-radius:0.25rem;display:flex;flex-wrap:no-wrap;justify-content:space-between;margin:1.5rem 0;> section{display:flex;flex:0 1 auto;text-align:left;}details &{display:block;margin:0.5rem 0.25rem;opacity:0.75;outline:none;overflow:hidden;text-align:left;text-overflow:ellipsis;white-space:nowrap;+ div{margin-top:0.75rem;}}&.isSmall{margin-bottom:0;}.ui.label{padding-left:0;padding-right:0;padding-top:0;}"]));