// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Button } from '@axia-js/react-components';
import { useBestNumber } from '@axia-js/react-hooks';
import FundAdd from "./FundAdd.js";
import Funds from "./Funds.js";
import Summary from "./Summary.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Crowdloan({
  auctionInfo,
  campaigns: {
    activeCap,
    activeRaised,
    funds,
    totalCap,
    totalRaised
  },
  className,
  leasePeriod,
  ownedIds
}) {
  const bestNumber = useBestNumber();
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Summary, {
      activeCap: activeCap,
      activeRaised: activeRaised,
      fundCount: funds ? funds.length : 0,
      totalCap: totalCap,
      totalRaised: totalRaised
    }), /*#__PURE__*/_jsx(Button.Group, {
      children: /*#__PURE__*/_jsx(FundAdd, {
        auctionInfo: auctionInfo,
        bestNumber: bestNumber,
        leasePeriod: leasePeriod,
        ownedIds: ownedIds
      })
    }), /*#__PURE__*/_jsx(Funds, {
      bestNumber: bestNumber,
      leasePeriod: leasePeriod,
      value: funds
    })]
  });
}

export default /*#__PURE__*/React.memo(Crowdloan);