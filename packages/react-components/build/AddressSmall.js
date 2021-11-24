// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import AccountName from "./AccountName.js";
import IdentityIcon from "./IdentityIcon/index.js";
import ParentAccount from "./ParentAccount.js";
import { toShortAddress } from "./util/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function AddressSmall({
  children,
  className = '',
  defaultName,
  onClickName,
  overrideName,
  parentAddress,
  toggle,
  value,
  withShortAddress = false,
  withSidebar = true
}) {
  const displayAsGrid = parentAddress || withShortAddress;
  return /*#__PURE__*/_jsxs("div", {
    className: `ui--AddressSmall ${className}`,
    children: [/*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx(IdentityIcon, {
        value: value
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: displayAsGrid ? 'addressGrid' : '',
      children: [parentAddress && /*#__PURE__*/_jsx("div", {
        className: "parentAccountName",
        children: /*#__PURE__*/_jsx(ParentAccount, {
          address: parentAddress
        })
      }), /*#__PURE__*/_jsx(AccountName, {
        className: `accountName ${withSidebar ? 'withSidebar' : ''}`,
        defaultName: defaultName,
        onClick: onClickName,
        override: overrideName,
        toggle: toggle,
        value: value,
        withSidebar: withSidebar,
        children: children
      }), withShortAddress && /*#__PURE__*/_jsx("div", {
        className: "shortAddress",
        "data-testid": "short-address",
        children: toShortAddress(value)
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(AddressSmall).withConfig({
  displayName: "AddressSmall",
  componentId: "sc-11tkqcq-0"
})(["white-space:nowrap;display:flex;align-items:center;.ui--IdentityIcon{margin-right:0.75rem;vertical-align:middle;}.parentAccountName,.shortAddress{display:flex;flex-direction:column;align-self:center;}.parentAccountName{grid-area:parentAccountName;}.accountName{grid-area:accountName;}.shortAddress{grid-area:shortAddress;color:#8B8B8B;font-size:0.75rem;}.addressGrid{border:0.031rem;height:3.438rem;display:grid;grid-template-columns:max-content;grid-template-rows:30% 40% 30%;grid-template-areas:\"parentAccountName\" \"accountName\" \"shortAddress\";}.ui--AccountName{max-width:26rem;overflow:hidden;&.withSidebar{cursor:help;}@media only screen and (max-width:1700px){max-width:24rem;}@media only screen and (max-width:1600px){max-width:22rem;}@media only screen and (max-width:1500px){max-width:20rem;}@media only screen and (max-width:1400px){max-width:18rem;}@media only screen and (max-width:1300px){max-width:16rem;}@media only screen and (max-width:1200px){max-width:14rem;}@media only screen and (max-width:1200px){max-width:12rem;}}"]));