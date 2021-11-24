// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Button } from '@axia-js/react-components';
import Auction from "./Auction.js";
import Bid from "./Bid.js";
import Summary from "./Summary.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Auctions({
  auctionInfo,
  campaigns,
  className,
  ownedIds,
  winningData
}) {
  const lastWinners = winningData && winningData[0];
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Summary, {
      auctionInfo: auctionInfo,
      lastWinners: lastWinners
    }), /*#__PURE__*/_jsx(Button.Group, {
      children: /*#__PURE__*/_jsx(Bid, {
        auctionInfo: auctionInfo,
        lastWinners: lastWinners,
        ownedIds: ownedIds
      })
    }), /*#__PURE__*/_jsx(Auction, {
      auctionInfo: auctionInfo,
      campaigns: campaigns,
      winningData: winningData
    })]
  });
}

export default /*#__PURE__*/React.memo(Auctions);