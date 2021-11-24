// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo, useRef } from 'react';
import { Table } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { useLeaseRangeMax } from "../useLeaseRanges.js";
import WinRange from "./WinRange.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Auction({
  auctionInfo,
  campaigns,
  className,
  winningData
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const rangeMax = useLeaseRangeMax();
  const newRaise = useCall(api.query.crowdloan.newRaise);
  const headerRef = useRef([[t('bids'), 'start', 3], [t('bidder'), 'address'], [t('crowdloan')], [t('leases')], [t('value')]]);
  const loans = useMemo(() => {
    if (newRaise && auctionInfo && auctionInfo.leasePeriod && campaigns.funds) {
      const leasePeriodStart = auctionInfo.leasePeriod;
      const leasePeriodEnd = leasePeriodStart.add(rangeMax);
      return campaigns.funds.filter(({
        firstSlot,
        isWinner,
        lastSlot,
        paraId
      }) => !isWinner && newRaise.some(n => n.eq(paraId)) && firstSlot.gte(leasePeriodStart) && lastSlot.lte(leasePeriodEnd)).sort((a, b) => b.value.cmp(a.value));
    } else {
      return undefined;
    }
  }, [auctionInfo, campaigns, newRaise, rangeMax]);
  const interleave = useCallback((winners, asIs) => {
    if (asIs || !newRaise || !(auctionInfo !== null && auctionInfo !== void 0 && auctionInfo.leasePeriod) || !loans) {
      return winners;
    }

    return winners.concat(...loans.filter(({
      firstSlot,
      lastSlot,
      paraId,
      value
    }) => !winners.some(w => w.firstSlot.eq(firstSlot) && w.lastSlot.eq(lastSlot)) && !loans.some(e => !paraId.eq(e.paraId) && firstSlot.eq(e.firstSlot) && lastSlot.eq(e.lastSlot) && value.lt(e.value)))).map(w => loans.find(({
      firstSlot,
      lastSlot,
      value
    }) => w.firstSlot.eq(firstSlot) && w.lastSlot.eq(lastSlot) && w.value.lt(value)) || w).sort((a, b) => a.firstSlot.eq(b.firstSlot) ? a.lastSlot.cmp(b.lastSlot) : a.firstSlot.cmp(b.firstSlot));
  }, [auctionInfo, loans, newRaise]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: newRaise && auctionInfo && auctionInfo.numAuctions && winningData && (auctionInfo.endBlock && !winningData.length ? t('No winners in this auction') : t('No ongoing auction')),
    header: headerRef.current,
    noBodyTag: true,
    children: auctionInfo && auctionInfo.leasePeriod && winningData && loans && (winningData.length ? winningData.map(({
      blockNumber,
      winners
    }, round) => /*#__PURE__*/_jsx("tbody", {
      children: interleave(winners, round !== 0 || winningData.length !== 1).map((value, index) => /*#__PURE__*/_jsx(WinRange, {
        auctionInfo: auctionInfo,
        blockNumber: blockNumber,
        isFirst: index === 0,
        isLatest: round === 0,
        value: value
      }, `${blockNumber.toString()}:${value.key}`))
    }, round)) : loans.length !== 0 && /*#__PURE__*/_jsx("tbody", {
      children: interleave([], false).map((value, index) => /*#__PURE__*/_jsx(WinRange, {
        auctionInfo: auctionInfo,
        isFirst: index === 0,
        isLatest: true,
        value: value
      }, `latest-crowd:${value.key}`))
    }, 'latest-crowd'))
  });
}

export default /*#__PURE__*/React.memo(Auction);