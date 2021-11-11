// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import ProposalCell from '@axia-js/app-democracy/Overview/ProposalCell';
import { Icon, LinkExternal } from '@axia-js/react-components';
import { useAccounts, useCollectiveInstance, useVotingStatus } from '@axia-js/react-hooks';
import { BlockToTime } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import Close from "./Close.js";
import Voters from "./Voters.js";
import Voting from "./Voting.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Motion({
  className = '',
  isMember,
  members,
  motion: {
    hash,
    proposal,
    votes
  },
  prime
}) {
  const {
    allAccounts
  } = useAccounts();
  const {
    hasFailed,
    isCloseable,
    isVoteable,
    remainingBlocks
  } = useVotingStatus(votes, members.length, 'council');
  const modLocation = useCollectiveInstance('council');
  const {
    hasVoted,
    hasVotedAye
  } = useMemo(() => {
    if (votes) {
      const hasVotedAye = allAccounts.some(address => votes.ayes.some(accountId => accountId.eq(address)));
      return {
        hasVoted: hasVotedAye || allAccounts.some(address => votes.nays.some(accountId => accountId.eq(address))),
        hasVotedAye
      };
    }

    return {
      hasVoted: false,
      hasVotedAye: false
    };
  }, [allAccounts, votes]);

  if (!votes || !modLocation) {
    return null;
  }

  const {
    ayes,
    end,
    index,
    nays,
    threshold
  } = votes;
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx("h1", {
        children: formatNumber(index)
      })
    }), /*#__PURE__*/_jsx(ProposalCell, {
      imageHash: hash,
      proposal: proposal
    }), /*#__PURE__*/_jsx("td", {
      className: "number together",
      children: formatNumber(threshold)
    }), /*#__PURE__*/_jsx("td", {
      className: "number together",
      children: remainingBlocks && end && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(BlockToTime, {
          value: remainingBlocks
        }), "#", formatNumber(end)]
      })
    }), /*#__PURE__*/_jsxs("td", {
      className: "expand",
      children: [/*#__PURE__*/_jsx(Voters, {
        isAye: true,
        members: members,
        threshold: threshold,
        votes: ayes
      }), /*#__PURE__*/_jsx(Voters, {
        members: members,
        threshold: threshold,
        votes: nays
      })]
    }), /*#__PURE__*/_jsxs("td", {
      className: "button",
      children: [isVoteable && !isCloseable && /*#__PURE__*/_jsx(Voting, {
        hash: hash,
        idNumber: index,
        isDisabled: !isMember,
        members: members,
        prime: prime,
        proposal: proposal
      }), isCloseable && /*#__PURE__*/_jsx(Close, {
        hasFailed: hasFailed,
        hash: hash,
        idNumber: index,
        proposal: proposal
      })]
    }), /*#__PURE__*/_jsx("td", {
      className: "badge",
      children: isMember && /*#__PURE__*/_jsx(Icon, {
        color: hasVoted ? hasVotedAye ? 'green' : 'red' : 'gray',
        icon: "asterisk"
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "links",
      children: /*#__PURE__*/_jsx(LinkExternal, {
        data: index,
        hash: hash.toString(),
        isLogo: true,
        type: "council"
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Motion);