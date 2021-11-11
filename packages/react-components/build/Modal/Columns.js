// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Columns({
  children,
  className = '',
  hint
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: `ui--Modal-Columns ${className}`,
    children: [/*#__PURE__*/_jsx("div", {
      children: children
    }), hint && /*#__PURE__*/_jsx("div", {
      children: hint
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Columns).withConfig({
  displayName: "Columns",
  componentId: "sc-8ckono-0"
})(["align-items:flex-start;display:flex;justify-content:space-between;&+&{margin-top:0.25rem;}> div{padding:0.25em 0;&:nth-child(1){flex:100%;max-width:100%;}&:nth-child(2){display:none;flex:0%;}@media only screen and (min-width:1024px){&:nth-child(1),&:only-child{flex:0 65%;max-width:65%;}&:nth-child(2){box-sizing:border-box;display:block;flex:0 34%;font-size:0.95rem;opacity:0.75;padding:0.75rem 0 0.25rem 0.5rem;}}}"]));