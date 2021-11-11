// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import Actions from "./Actions.js";
import ProposalList from "./Proposals.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function ProposalsTab({
  className,
  proposals
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Actions, {}), /*#__PURE__*/_jsx(ProposalList, {
      proposals: proposals
    })]
  });
}

export default /*#__PURE__*/React.memo(ProposalsTab);