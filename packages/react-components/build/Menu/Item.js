// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styled from 'styled-components';
import Icon from "../Icon.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Item({
  children,
  className = '',
  disabled,
  icon,
  onClick
}) {
  const _onClick = useCallback(() => !disabled && onClick && onClick(), [disabled, onClick]);

  return /*#__PURE__*/_jsxs("div", {
    className: `ui--Menu__Item ${className}${icon ? ' hasIcon' : ''}`,
    onClick: _onClick,
    children: [icon && /*#__PURE__*/_jsx(Icon, {
      color: "darkGray",
      icon: icon
    }), children]
  });
}

export default /*#__PURE__*/React.memo(styled(Item).withConfig({
  displayName: "Item",
  componentId: "sc-1nrofsh-0"
})(["display:flex;flex-direction:row;align-items:center;position:relative;font-size:0.93rem;line-height:0.93rem;cursor:pointer;padding:0.5rem 1rem;&:last-child{margin-bottom:0;}&.hasIcon{padding-left:2.6rem;}.ui--Icon{position:absolute;left:1rem;}"]));