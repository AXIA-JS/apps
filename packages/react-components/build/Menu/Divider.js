// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Divider({
  className = ''
}) {
  return /*#__PURE__*/_jsx("div", {
    className: `ui--Menu__Divider ${className}`
  });
}

export default /*#__PURE__*/React.memo(styled(Divider).withConfig({
  displayName: "Divider",
  componentId: "sc-1nvm60d-0"
})(["margin:0.25rem 0 1rem;border-top:1px solid var(--border-table);&:first-child,&:last-child{display:none}"]));