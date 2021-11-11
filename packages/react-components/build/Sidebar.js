// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import Button from "./Button/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Sidebar({
  button,
  children,
  className = '',
  dataTestId = '',
  onClose,
  sidebarRef
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: `ui--Sidebar ${className}`,
    "data-testid": dataTestId,
    ref: sidebarRef,
    children: [/*#__PURE__*/_jsxs(Button.Group, {
      className: "ui--Sidebar-buttons",
      children: [button, /*#__PURE__*/_jsx(Button, {
        dataTestId: "close-sidebar-button",
        icon: "times",
        isBasic: true,
        isCircular: true,
        onClick: onClose
      })]
    }), children]
  });
}

export default /*#__PURE__*/React.memo(styled(Sidebar).withConfig({
  displayName: "Sidebar",
  componentId: "sc-crt1kg-0"
})(({
  offset = 0,
  position
}) => `
  background: var(--bg-page);
  bottom: 0;
  box-shadow: ${position === 'right' ? '-6px' : '6px'} 0px 20px 0px rgba(0, 0, 0, 0.3);
  margin-left: -0.125rem;
  max-width: 24rem;
  min-width: 24rem;
  position: fixed;
  padding: 1rem;
  overflow-y: auto;
  top: 0;
  z-index: 999;
  ${position}: ${offset};

  .ui--Sidebar-buttons {
    margin: 0;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
  }
`));