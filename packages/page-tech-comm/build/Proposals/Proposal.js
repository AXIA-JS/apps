// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import ProposalCell from '@axia-js/app-democracy/Overview/ProposalCell';
import { AddressMini } from '@axia-js/react-components';
import { useApi, useCall, useCollectiveInstance, useVotingStatus } from '@axia-js/react-hooks';
import { BlockToTime } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import Close from "./Close.js";
import Voting from "./Voting.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Proposal({
  className = '',
  imageHash,
  members,
  prime,
  type
}) {
  const {
    api
  } = useApi();
  const derive = useCall(api.derive[type].proposal, [imageHash]);
  const {
    hasFailed,
    isCloseable,
    isVoteable,
    remainingBlocks
  } = useVotingStatus(derive === null || derive === void 0 ? void 0 : derive.votes, members.length, type);
  const modLocation = useCollectiveInstance(type);

  if (!modLocation || !derive || !derive.votes) {
    return null;
  }

  const {
    ayes,
    end,
    index,
    nays,
    threshold
  } = derive.votes;
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx("h1", {
        children: formatNumber(index)
      })
    }), /*#__PURE__*/_jsx(ProposalCell, {
      imageHash: imageHash,
      proposal: derive.proposal
    }), /*#__PURE__*/_jsxs("td", {
      className: "number",
      children: [formatNumber(ayes.length), "/", formatNumber(threshold)]
    }), /*#__PURE__*/_jsx("td", {
      className: "number together",
      children: remainingBlocks && end && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(BlockToTime, {
          value: remainingBlocks
        }), "#", formatNumber(end)]
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "address",
      children: ayes.map((address, index) => /*#__PURE__*/_jsx(AddressMini, {
        value: address,
        withBalance: false
      }, `${index}:${address.toHex()}`))
    }), /*#__PURE__*/_jsx("td", {
      className: "address",
      children: nays.map((address, index) => /*#__PURE__*/_jsx(AddressMini, {
        value: address,
        withBalance: false
      }, `${index}:${address.toHex()}`))
    }), /*#__PURE__*/_jsxs("td", {
      className: "button",
      children: [isVoteable && !isCloseable && /*#__PURE__*/_jsx(Voting, {
        hash: imageHash,
        members: members,
        prime: prime,
        proposalId: index,
        type: type
      }), isCloseable && /*#__PURE__*/_jsx(Close, {
        hasFailed: hasFailed,
        hash: imageHash,
        idNumber: index,
        proposal: derive.proposal,
        type: type
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Proposal);