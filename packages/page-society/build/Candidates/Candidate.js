// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { AddressSmall } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import Votes from "../Overview/Votes.js";
import BidType from "./BidType.js";
import CandidateVoting from "./CandidateVoting.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Candidate({
  allMembers,
  isMember,
  ownMembers,
  value: {
    accountId,
    kind,
    value
  }
}) {
  const {
    api
  } = useApi();
  const votes = useCall(api.query.society.votes.multi, [allMembers.map(memberId => [accountId, memberId])], {
    transform: voteOpts => voteOpts.map((voteOpt, index) => [allMembers[index], voteOpt]).filter(([, voteOpt]) => voteOpt.isSome).map(([accountId, voteOpt]) => [accountId, voteOpt.unwrap()])
  });
  return /*#__PURE__*/_jsxs("tr", {
    children: [/*#__PURE__*/_jsx("td", {
      className: "address all",
      children: /*#__PURE__*/_jsx(AddressSmall, {
        value: accountId
      })
    }), /*#__PURE__*/_jsx(BidType, {
      value: kind
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx(FormatBalance, {
        value: value
      })
    }), /*#__PURE__*/_jsx(Votes, {
      votes: votes
    }), /*#__PURE__*/_jsx("td", {
      className: "button",
      children: /*#__PURE__*/_jsx(CandidateVoting, {
        candidateId: accountId.toString(),
        isMember: isMember,
        ownMembers: ownMembers
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Candidate);