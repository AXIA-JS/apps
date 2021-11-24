// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import Labelled from "../Labelled.js";
import { jsx as _jsx } from "react/jsx-runtime";

function LinkedWrapper({
  children,
  className = '',
  help,
  label,
  withLabel
}) {
  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsx(Labelled, {
      help: help,
      label: label,
      withLabel: withLabel,
      children: /*#__PURE__*/_jsx("div", {
        className: "ui--DropdownLinked ui--row",
        children: children
      })
    })
  });
}

export default /*#__PURE__*/React.memo(styled(LinkedWrapper).withConfig({
  displayName: "LinkedWrapper",
  componentId: "sc-p1gzo0-0"
})([".ui--DropdownLinked-Items{.text{box-sizing:border-box;display:flex !important;flex-wrap:nowrap;justify-content:space-between;overflow:hidden;position:relative;width:100%;white-space:nowrap;}> .text{padding-left:1em;}}.ui--DropdownLinked-Item-text,.ui--DropdownLinked-Item-call{display:inline-block;}.ui--DropdownLinked-Item-call{flex:1 0;margin-right:1rem;text-align:left;text-overflow:ellipsis;}.ui--DropdownLinked-Item-text{flex:1;opacity:0.5;overflow:hidden;text-align:right;text-overflow:ellipsis;}"]));