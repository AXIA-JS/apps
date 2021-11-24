// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import AccountName from "../AccountName.js";
import IdentityIcon from "../IdentityIcon/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function KeyPair({
  address,
  className = ''
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: `ui--KeyPair ${className}`,
    children: [/*#__PURE__*/_jsx(IdentityIcon, {
      className: "icon",
      value: address
    }), /*#__PURE__*/_jsx("div", {
      className: "name",
      children: /*#__PURE__*/_jsx(AccountName, {
        value: address
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "address",
      children: address
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(KeyPair).withConfig({
  displayName: "KeyPair",
  componentId: "sc-1ym7m2c-0"
})(["display:flex;flex-wrap:nowrap;justify-content:space-between;position:relative;white-space:nowrap;> .address{display:inline-block;flex:1;font:var(--font-mono);margin-left:1rem;opacity:0.5;overflow:hidden;text-align:right;text-overflow:ellipsis;}> .icon{position:absolute;top:-5px;left:0;}> .name{display:inline-block;flex:1 0;margin-left:3rem;overflow:hidden;text-overflow:ellipsis;&.uppercase{text-transform:uppercase;}}"]));