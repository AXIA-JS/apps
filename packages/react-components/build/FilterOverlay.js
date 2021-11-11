// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import media from "./media.js";
import { jsx as _jsx } from "react/jsx-runtime";

function FilterOverlay({
  children,
  className
}) {
  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: children
  });
}

export default /*#__PURE__*/React.memo(styled(FilterOverlay).withConfig({
  displayName: "FilterOverlay",
  componentId: "sc-u6nyid-0"
})(["display:none;right:calc(50% - var(--width-half) + 1.5rem);.ui--Labelled label{display:none;}&& .ui--Input{margin:0.29rem 0;}", ";@media (max-width:1750px){right:1.5rem;}"], media.DESKTOP`
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 0rem;

    > div {
      max-width: 35rem !important;
    }

    .ui--Labelled label {
      display: flex;
    }

    .ui.selection.dropdown {
      white-space: nowrap;
    }
  `));