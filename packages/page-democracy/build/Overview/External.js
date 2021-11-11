// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { AddressMini, Button } from '@axia-js/react-components';
import { useCollectiveMembers } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import Fasttrack from "./Fasttrack.js";
import PreImageButton from "./PreImageButton.js";
import ProposalCell from "./ProposalCell.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function External({
  className = '',
  value: {
    image,
    imageHash,
    threshold
  }
}) {
  const {
    isMember,
    members
  } = useCollectiveMembers('technicalCommittee');
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx(ProposalCell, {
      imageHash: imageHash,
      proposal: image === null || image === void 0 ? void 0 : image.proposal
    }), /*#__PURE__*/_jsx("td", {
      className: "address",
      children: image && /*#__PURE__*/_jsx(AddressMini, {
        value: image.proposer
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: image && /*#__PURE__*/_jsx(FormatBalance, {
        value: image.balance
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "button",
      children: /*#__PURE__*/_jsxs(Button.Group, {
        children: [!(image !== null && image !== void 0 && image.proposal) && /*#__PURE__*/_jsx(PreImageButton, {
          imageHash: imageHash
        }), threshold && isMember && /*#__PURE__*/_jsx(Fasttrack, {
          imageHash: imageHash,
          members: members,
          threshold: threshold
        })]
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(External);