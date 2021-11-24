// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Button } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import ProposalCreate from "./ProposalCreate.js";
import Proposals from "./Proposals.js";
import Summary from "./Summary.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Overview({
  className,
  isMember,
  members
}) {
  const {
    api
  } = useApi();
  const info = useCall(api.derive.treasury.proposals);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Summary, {
      approvalCount: info === null || info === void 0 ? void 0 : info.approvals.length,
      proposalCount: info === null || info === void 0 ? void 0 : info.proposals.length
    }), /*#__PURE__*/_jsx(Button.Group, {
      children: /*#__PURE__*/_jsx(ProposalCreate, {})
    }), /*#__PURE__*/_jsx(Proposals, {
      isMember: isMember,
      members: members,
      proposals: info === null || info === void 0 ? void 0 : info.proposals
    }), /*#__PURE__*/_jsx(Proposals, {
      isApprovals: true,
      isMember: isMember,
      members: members,
      proposals: info === null || info === void 0 ? void 0 : info.approvals
    })]
  });
}

export default /*#__PURE__*/React.memo(Overview);