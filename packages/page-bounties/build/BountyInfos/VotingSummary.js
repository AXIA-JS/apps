// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import styled from 'styled-components';
import VotingDescriptionInfo from '@axia-js/app-bounties/BountyInfos/VotingDescriptionInfo';
import { useCollectiveMembers } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import VotingLink from "./VotingLink.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function VotingSummary({
  className,
  proposal,
  status
}) {
  const {
    members
  } = useCollectiveMembers('council');
  const {
    t
  } = useTranslation();
  const ayes = useMemo(() => {
    var _proposal$votes, _proposal$votes$ayes;

    return proposal === null || proposal === void 0 ? void 0 : (_proposal$votes = proposal.votes) === null || _proposal$votes === void 0 ? void 0 : (_proposal$votes$ayes = _proposal$votes.ayes) === null || _proposal$votes$ayes === void 0 ? void 0 : _proposal$votes$ayes.length;
  }, [proposal]);
  const nays = useMemo(() => {
    var _proposal$votes2, _proposal$votes2$nays;

    return proposal === null || proposal === void 0 ? void 0 : (_proposal$votes2 = proposal.votes) === null || _proposal$votes2 === void 0 ? void 0 : (_proposal$votes2$nays = _proposal$votes2.nays) === null || _proposal$votes2$nays === void 0 ? void 0 : _proposal$votes2$nays.length;
  }, [proposal]);
  const threshold = useMemo(() => {
    var _proposal$votes3;

    return proposal === null || proposal === void 0 ? void 0 : (_proposal$votes3 = proposal.votes) === null || _proposal$votes3 === void 0 ? void 0 : _proposal$votes3.threshold.toNumber();
  }, [proposal]);
  const nayThreshold = useMemo(() => members !== null && members !== void 0 && members.length && threshold ? members.length - threshold + 1 : 0, [members, threshold]);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: proposal && /*#__PURE__*/_jsxs("div", {
      className: className,
      "data-testid": "voting-summary",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "voting-summary-text",
        children: [/*#__PURE__*/_jsx("span", {
          children: t('Aye')
        }), " ", /*#__PURE__*/_jsxs("b", {
          children: [ayes, "/", threshold]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "voting-summary-text",
        children: [/*#__PURE__*/_jsx("span", {
          children: t('Nay')
        }), " ", /*#__PURE__*/_jsxs("b", {
          children: [nays, "/", nayThreshold]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "link-info",
        children: [/*#__PURE__*/_jsx(VotingLink, {}), /*#__PURE__*/_jsx(VotingDescriptionInfo, {
          proposal: proposal,
          status: status
        })]
      })]
    })
  });
}

export default /*#__PURE__*/React.memo(styled(VotingSummary).withConfig({
  displayName: "VotingSummary",
  componentId: "sc-llfdbw-0"
})([".voting-summary-text{font-size:0.85rem;line-height:1.5rem;color:var(--color-label);span{min-width:0.5rem;margin-right:0.5rem;}}.link-info{display:flex;justify-content:space-between;align-items:center;line-height:1.5rem;}"]));