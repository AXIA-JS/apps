// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import { useEffect, useRef, useState } from 'react';
import { useApi, useBestNumber, useCall, useEventTrigger, useIsMountedRef } from '@axia-js/react-hooks';
import { BN_ONE, BN_ZERO, u8aEq } from '@axia-js/util';
import { CROWD_PREFIX } from "./constants.js";
import { useLeaseRanges } from "./useLeaseRanges.js";
const FIRST_PARAM = [0];

function isNewWinners(a, b) {
  return JSON.stringify({
    w: a
  }) !== JSON.stringify({
    w: b
  });
}

function isNewOrdering(a, b) {
  return a.length !== b.length || a.some(({
    firstSlot,
    lastSlot,
    paraId
  }, index) => !paraId.eq(b[index].paraId) || !firstSlot.eq(b[index].firstSlot) || !lastSlot.eq(b[index].lastSlot));
}

function extractWinners(ranges, auctionInfo, optData) {
  return optData.isNone ? [] : optData.unwrap().reduce((winners, optEntry, index) => {
    if (optEntry.isSome) {
      const [accountId, paraId, value] = optEntry.unwrap();
      const period = auctionInfo.leasePeriod || BN_ZERO;
      const [first, last] = ranges[index];
      winners.push({
        accountId: accountId.toString(),
        firstSlot: period.addn(first),
        isCrowdloan: u8aEq(CROWD_PREFIX, accountId.subarray(0, CROWD_PREFIX.length)),
        key: paraId.toString(),
        lastSlot: period.addn(last),
        paraId,
        value
      });
    }

    return winners;
  }, []);
}

function createWinning({
  endBlock
}, blockOffset, winners) {
  return {
    blockNumber: endBlock && blockOffset ? blockOffset.add(endBlock) : blockOffset || BN_ZERO,
    blockOffset: blockOffset || BN_ZERO,
    total: winners.reduce((total, {
      value
    }) => total.iadd(value), new BN(0)),
    winners
  };
}

function extractData(ranges, auctionInfo, values) {
  return values.sort(([{
    args: [a]
  }], [{
    args: [b]
  }]) => a.cmp(b)).reduce((all, [{
    args: [blockOffset]
  }, optData]) => {
    const winners = extractWinners(ranges, auctionInfo, optData);
    winners.length && (all.length === 0 || isNewWinners(winners, all[all.length - 1].winners)) && all.push(createWinning(auctionInfo, blockOffset, winners));
    return all;
  }, []).reverse();
}

function mergeCurrent(ranges, auctionInfo, prev, optCurrent, blockOffset) {
  const current = createWinning(auctionInfo, blockOffset, extractWinners(ranges, auctionInfo, optCurrent));

  if (current.winners.length) {
    if (!prev || !prev.length) {
      return [current];
    }

    if (isNewWinners(current.winners, prev[0].winners)) {
      if (isNewOrdering(current.winners, prev[0].winners)) {
        return [current, ...prev];
      }

      prev[0] = current;
      return [...prev];
    }
  }

  return prev;
}

function mergeFirst(ranges, auctionInfo, prev, optFirstData) {
  if (prev && prev.length <= 1) {
    const updated = prev || [];
    const firstEntry = createWinning(auctionInfo, null, extractWinners(ranges, auctionInfo, optFirstData));

    if (!firstEntry.winners.length) {
      return updated;
    } else if (!updated.length) {
      return [firstEntry];
    }

    updated[updated.length - 1] = firstEntry;
    return updated.slice();
  }

  return prev;
}

export default function useWinningData(auctionInfo) {
  var _api$events$auctions, _api$query$auctions, _api$query$auctions2;

  const {
    api
  } = useApi();
  const mountedRef = useIsMountedRef();
  const ranges = useLeaseRanges();
  const [result, setResult] = useState();
  const bestNumber = useBestNumber();
  const trigger = useEventTrigger([(_api$events$auctions = api.events.auctions) === null || _api$events$auctions === void 0 ? void 0 : _api$events$auctions.BidAccepted]);
  const triggerRef = useRef(trigger);
  const initialEntries = useCall((_api$query$auctions = api.query.auctions) === null || _api$query$auctions === void 0 ? void 0 : _api$query$auctions.winning.entries);
  const optFirstData = useCall((_api$query$auctions2 = api.query.auctions) === null || _api$query$auctions2 === void 0 ? void 0 : _api$query$auctions2.winning, FIRST_PARAM); // should be fired once, all entries as an initial round

  useEffect(() => {
    mountedRef.current && auctionInfo && initialEntries && setResult(extractData(ranges, auctionInfo, initialEntries));
  }, [auctionInfo, initialEntries, mountedRef, ranges]); // when block 0 changes, update (typically in non-ending-period, static otherwise)

  useEffect(() => {
    mountedRef.current && auctionInfo && optFirstData && setResult(prev => mergeFirst(ranges, auctionInfo, prev, optFirstData));
  }, [auctionInfo, optFirstData, mountedRef, ranges]); // on a bid event, get the new entry (assuming the event really triggered, i.e. not just a block)
  // and add it to the list when not duplicated. Additionally we cleanup after ourselves when endBlock
  // gets cleared

  useEffect(() => {
    if (auctionInfo !== null && auctionInfo !== void 0 && auctionInfo.endBlock && bestNumber && bestNumber.gt(auctionInfo.endBlock) && triggerRef.current !== trigger) {
      var _api$query$auctions3;

      const blockOffset = bestNumber.sub(auctionInfo.endBlock).iadd(BN_ONE);
      triggerRef.current = trigger;
      (_api$query$auctions3 = api.query.auctions) === null || _api$query$auctions3 === void 0 ? void 0 : _api$query$auctions3.winning(blockOffset).then(optCurrent => mountedRef.current && setResult(prev => mergeCurrent(ranges, auctionInfo, prev, optCurrent, blockOffset))).catch(console.error);
    }
  }, [api, bestNumber, auctionInfo, mountedRef, ranges, trigger, triggerRef]);
  return result;
}