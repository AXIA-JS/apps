// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import AccountName from "./AccountName.js";
import BalanceDisplay from "./Balance.js";
import BondedDisplay from "./Bonded.js";
import IdentityIcon from "./IdentityIcon/index.js";
import LockedVote from "./LockedVote.js";
import { toShortAddress } from "./util/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function AddressMini({
  balance,
  bonded,
  children,
  className = '',
  iconInfo,
  isHighlight,
  isPadded = true,
  label,
  labelBalance,
  nameExtra,
  onNameClick,
  summary,
  value,
  withAddress = true,
  withBalance = false,
  withBonded = false,
  withLockedVote = false,
  withName = true,
  withShrink = false,
  withSidebar = true
}) {
  if (!value) {
    return null;
  }

  return /*#__PURE__*/_jsxs("div", {
    className: `ui--AddressMini${isHighlight ? ' isHighlight' : ''}${isPadded ? ' padded' : ''}${withShrink ? ' withShrink' : ''} ${className}`,
    children: [label && /*#__PURE__*/_jsx("label", {
      className: "ui--AddressMini-label",
      children: label
    }), /*#__PURE__*/_jsxs("div", {
      className: "ui--AddressMini-icon",
      children: [/*#__PURE__*/_jsx(IdentityIcon, {
        value: value
      }), iconInfo && /*#__PURE__*/_jsx("div", {
        className: "ui--AddressMini-icon-info",
        children: iconInfo
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "ui--AddressMini-info",
      children: [withAddress && /*#__PURE__*/_jsx("div", {
        className: "ui--AddressMini-address",
        onClick: onNameClick,
        children: withName ? /*#__PURE__*/_jsx(AccountName, {
          value: value,
          withSidebar: withSidebar,
          children: nameExtra
        }) : toShortAddress(value)
      }), children]
    }), /*#__PURE__*/_jsxs("div", {
      className: "ui--AddressMini-balances",
      children: [withBalance && /*#__PURE__*/_jsx(BalanceDisplay, {
        balance: balance,
        label: labelBalance,
        params: value
      }), withBonded && /*#__PURE__*/_jsx(BondedDisplay, {
        bonded: bonded,
        label: "",
        params: value
      }), withLockedVote && /*#__PURE__*/_jsx(LockedVote, {
        params: value
      }), summary && /*#__PURE__*/_jsx("div", {
        className: "ui--AddressMini-summary",
        children: summary
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(AddressMini).withConfig({
  displayName: "AddressMini",
  componentId: "sc-edf6d0-0"
})(["display:inline-block;padding:0 0.25rem 0 1rem;text-align:left;white-space:nowrap;&.padded{display:inline-block;padding:0 1rem 0 0;}&.summary{position:relative;top:-0.2rem;}.ui--AddressMini-info{max-width:12rem;min-width:12rem;@media only screen and (max-width:1800px){max-width:11.5rem;min-width:11.5rem;}@media only screen and (max-width:1700px){max-width:11rem;min-width:11rem;}@media only screen and (max-width:1600px){max-width:10.5rem;min-width:10.5rem;}@media only screen and (max-width:1500px){max-width:10rem;min-width:10rem;}@media only screen and (max-width:1400px){max-width:9.5rem;min-width:9.5rem;}@media only screen and (max-width:1300px){max-width:9rem;min-width:9rem;}}.ui--AddressMini-address{overflow:hidden;text-align:left;text-overflow:ellipsis;width:fit-content;max-width:inherit;> div{overflow:hidden;text-overflow:ellipsis;}}&.withShrink{.ui--AddressMini-address{min-width:3rem;}}.ui--AddressMini-label{margin:0 0 -0.5rem 2.25rem;}.ui--AddressMini-balances{display:grid;.ui--Balance,.ui--Bonded,.ui--LockedVote{font-size:0.75rem;margin-left:2.25rem;margin-top:-0.5rem;text-align:left;}}.ui--AddressMini-icon{margin:0 0.5rem 0 0;.ui--AddressMini-icon-info{position:absolute;right:-0.5rem;top:-0.5rem;z-index:1;}.ui--IdentityIcon{margin:0;vertical-align:middle;}}.ui--AddressMini-icon,.ui--AddressMini-info{display:inline-block;position:relative;vertical-align:middle;}.ui--AddressMini-summary{font-size:0.75rem;line-height:1.2;margin-left:2.25rem;margin-top:-0.2rem;text-align:left;}"]));