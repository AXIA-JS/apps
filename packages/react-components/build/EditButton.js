// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { colorLink } from "./styles/theme.js";
import Icon from "./Icon.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function EditButton({
  children,
  className = '',
  icon = 'edit',
  onClick
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: `ui--EditButton ${className}`,
    onClick: onClick,
    children: [children, /*#__PURE__*/_jsx("span", {
      className: "editSpan",
      children: /*#__PURE__*/_jsx(Icon, {
        className: "icon-button",
        icon: icon
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(EditButton).withConfig({
  displayName: "EditButton",
  componentId: "sc-118l20f-0"
})(["cursor:pointer;.ui--Icon.icon-button{color:", ";cursor:pointer;margin:0 0 0 0.5rem;}.editSpan{white-space:nowrap;}"], colorLink));