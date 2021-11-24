// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Button } from '@axia-js/react-components';
import { useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import BidNew from "./BidNew.js";
import Bids from "./Bids.js";
import AllCandidates from "./Candidates.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Candidates({
  allMembers,
  candidates,
  className,
  isMember,
  ownMembers
}) {
  const {
    t
  } = useTranslation();
  const [isBidOpen, toggleBidOpen] = useToggle();
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsxs(Button.Group, {
      children: [/*#__PURE__*/_jsx(Button, {
        icon: "plus",
        label: t('Submit bid'),
        onClick: toggleBidOpen
      }), isBidOpen && /*#__PURE__*/_jsx(BidNew, {
        onClose: toggleBidOpen
      })]
    }), /*#__PURE__*/_jsx(AllCandidates, {
      allMembers: allMembers,
      candidates: candidates,
      isMember: isMember,
      ownMembers: ownMembers
    }), /*#__PURE__*/_jsx(Bids, {})]
  });
}

export default /*#__PURE__*/React.memo(Candidates);