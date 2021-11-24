// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Button } from '@axia-js/react-components';
import { useApi, useBestNumber, useCall } from '@axia-js/react-hooks';
import { useModuleElections } from "../useModuleElections.js";
import Candidates from "./Candidates.js";
import Members from "./Members.js";
import SubmitCandidacy from "./SubmitCandidacy.js";
import Summary from "./Summary.js";
import Vote from "./Vote.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const transformVotes = {
  transform: entries => entries.reduce((result, [voter, {
    votes
  }]) => {
    votes.forEach(candidate => {
      const address = candidate.toString();

      if (!result[address]) {
        result[address] = [];
      }

      result[address].push(voter);
    });
    return result;
  }, {})
};

function Overview({
  className = '',
  prime
}) {
  const {
    api
  } = useApi();
  const bestNumber = useBestNumber();
  const electionsInfo = useCall(api.derive.elections.info);
  const allVotes = useCall(api.derive.council.votes, undefined, transformVotes);
  const modElections = useModuleElections();
  const hasElections = !!modElections;
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Summary, {
      bestNumber: bestNumber,
      electionsInfo: electionsInfo,
      hasElections: !!modElections
    }), hasElections && /*#__PURE__*/_jsxs(Button.Group, {
      children: [/*#__PURE__*/_jsx(Vote, {
        electionsInfo: electionsInfo
      }), /*#__PURE__*/_jsx(SubmitCandidacy, {
        electionsInfo: electionsInfo
      })]
    }), /*#__PURE__*/_jsx(Members, {
      allVotes: allVotes,
      electionsInfo: electionsInfo,
      hasElections: hasElections,
      prime: prime
    }), hasElections && /*#__PURE__*/_jsx(Candidates, {
      allVotes: allVotes,
      electionsInfo: electionsInfo
    })]
  });
}

export default /*#__PURE__*/React.memo(Overview);