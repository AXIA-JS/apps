// Copyright 2017-2020 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import Icon from "../Icon.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function CurrentSection({
  className = '',
  icon,
  text
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: `${className} active-tab`,
    children: [/*#__PURE__*/_jsx(Icon, {
      icon: icon
    }), /*#__PURE__*/_jsx("span", {
      children: text
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(CurrentSection).withConfig({
  displayName: "CurrentSection",
  componentId: "sc-nwp92j-0"
})(["margin:0 2.5rem 0 1.5rem;font-weight:400;font-size:1rem;line-height:1.57rem;min-width:max-content;height:100%;display:flex;align-items:center;color:var(--color-text);.ui--Icon{margin-right:0.85rem;max-width:1rem;max-height:1rem;}@media only screen and (max-width:900px){margin:0 1.5rem;}"]));