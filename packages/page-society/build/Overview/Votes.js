// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { useTranslation } from "../translate.js";
import VotesExpander from "./VotesExpander.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Votes({
  votes
}) {
  const {
    t
  } = useTranslation();
  const [{
    allAye,
    allNay,
    allSkeptic
  }, setVoteSplit] = useState({
    allAye: [],
    allNay: [],
    allSkeptic: []
  });
  useEffect(() => {
    votes && setVoteSplit({
      allAye: votes.filter(([, vote]) => vote.isApprove),
      allNay: votes.filter(([, vote]) => vote.isReject),
      allSkeptic: votes.filter(([, vote]) => vote.isSkeptic)
    });
  }, [votes]);
  return /*#__PURE__*/_jsxs("td", {
    className: "expand",
    children: [/*#__PURE__*/_jsx(VotesExpander, {
      label: t('Skeptics'),
      votes: allSkeptic
    }), /*#__PURE__*/_jsx(VotesExpander, {
      label: t('Approvals'),
      votes: allAye
    }), /*#__PURE__*/_jsx(VotesExpander, {
      label: t('Rejections'),
      votes: allNay
    })]
  });
}

export default /*#__PURE__*/React.memo(Votes);