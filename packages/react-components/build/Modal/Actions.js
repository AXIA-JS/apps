// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import Button from "../Button/index.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Actions({
  children,
  className = ''
}) {
  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsx(Button.Group, {
      children: children
    })
  });
}

export default /*#__PURE__*/React.memo(styled(Actions).withConfig({
  displayName: "Actions",
  componentId: "sc-1stqdlr-0"
})(["background-color:var(--bg-input);border-radius:0 0 4px 4px;.ui--Button-Group{margin:1rem 1rem;}"]));