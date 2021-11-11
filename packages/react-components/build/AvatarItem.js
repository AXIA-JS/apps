// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function AvatarItem({
  children,
  className = '',
  icon,
  isBig,
  subtitle,
  title
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: ['ui--AvatarItem', className, isBig && 'big'].join(' '),
    children: [/*#__PURE__*/_jsx("div", {
      className: "ui--AvatarItem-icon",
      children: icon
    }), /*#__PURE__*/_jsxs("div", {
      className: "ui--AvatarItem-details",
      children: [/*#__PURE__*/_jsx("div", {
        className: "ui--AvatarItem-title",
        children: title
      }), /*#__PURE__*/_jsx("div", {
        className: "ui--AvatarItem-subtitle",
        children: subtitle
      })]
    }), children]
  });
}

export default /*#__PURE__*/React.memo(styled(AvatarItem).withConfig({
  displayName: "AvatarItem",
  componentId: "sc-1fg3wwo-0"
})(["&{display:flex;align-items:center;.ui--AvatarItem-icon{margin-right:0.5rem;display:flex;align-items:center;justify-content:center;}}.ui--AvatarItem-details{.ui--AvatarItem-title{font-weight:600;font-size:1rem;}.ui--AvatarItem-subtitle{font-weight:var(--font-weight-normal);font-size:1rem;}}&.big{.ui--AvatarItem-icon{width:3.4rem;height:3.4rem;margin-right:0.6rem;> .ui--Icon{font-size:1.6rem;line-height:3.4rem;}}.ui--AvatarItem-details{.ui--AvatarItem-name{font-size:1.4rem;line-height:1.4rem;}}}"]));