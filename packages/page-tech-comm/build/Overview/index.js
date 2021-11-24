// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import Members from "./Members.js";
import Summary from "./Summary.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Overview({
  className = '',
  isMember,
  members,
  prime,
  proposalHashes,
  type
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Summary, {
      isMember: isMember,
      members: members,
      proposalHashes: proposalHashes,
      type: type
    }), /*#__PURE__*/_jsx(Members, {
      members: members,
      prime: prime
    })]
  });
}

export default /*#__PURE__*/React.memo(Overview);