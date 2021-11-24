// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import Defender from "./Defender.js";
import Members from "./Members.js";
import Summary from "./Summary.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Overview({
  className,
  info,
  isMember,
  mapMembers,
  ownMembers,
  payoutTotal
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Summary, {
      info: info,
      payoutTotal: payoutTotal
    }), /*#__PURE__*/_jsx(Defender, {
      info: info,
      isMember: isMember,
      ownMembers: ownMembers
    }), /*#__PURE__*/_jsx(Members, {
      mapMembers: mapMembers
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Overview).withConfig({
  displayName: "Overview",
  componentId: "sc-161u92j-0"
})([".overviewSection{margin-bottom:1.5rem;}"]));