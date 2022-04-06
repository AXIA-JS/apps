"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useWinningData;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _constants = require("./constants.cjs");

var _useLeaseRanges = require("./useLeaseRanges.cjs");

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
const FIRST_PARAM = [0];

function isNewWinners(a, b) {
  return JSON.stringify({
    w: a
  }) !== JSON.stringify({
    w: b
  });
}

function isNewOrdering(a, b) {
  return a.length !== b.length || a.some((_ref, index) => {
    let {
      firstSlot,
      lastSlot,
      allyId
    } = _ref;
    return !allyId.eq(b[index].allyId) || !firstSlot.eq(b[index].firstSlot) || !lastSlot.eq(b[index].lastSlot);
  });
}

function extractWinners(ranges, auctionInfo, optData) {
  return optData.isNone ? [] : optData.unwrap().reduce((winners, optEntry, index) => {
    if (optEntry.isSome) {
      const [accountId, allyId, value] = optEntry.unwrap();
      const period = auctionInfo.leasePeriod || _util.BN_ZERO;
      const [first, last] = ranges[index];
      winners.push({
        accountId: accountId.toString(),
        firstSlot: period.addn(first),
        isCrowdloan: (0, _util.u8aEq)(_constants.CROWD_PREFIX, accountId.subarray(0, _constants.CROWD_PREFIX.length)),
        key: allyId.toString(),
        lastSlot: period.addn(last),
        allyId,
        value
      });
    }

    return winners;
  }, []);
}

function createWinning(_ref2, blockOffset, winners) {
  let {
    endBlock
  } = _ref2;
  return {
    blockNumber: endBlock && blockOffset ? blockOffset.add(endBlock) : blockOffset || _util.BN_ZERO,
    blockOffset: blockOffset || _util.BN_ZERO,
    total: winners.reduce((total, _ref3) => {
      let {
        value
      } = _ref3;
      return total.iadd(value);
    }, new _bn.default(0)),
    winners
  };
}

function extractData(ranges, auctionInfo, values) {
  return values.sort((_ref4, _ref5) => {
    let [{
      args: [a]
    }] = _ref4;
    let [{
      args: [b]
    }] = _ref5;
    return a.cmp(b);
  }).reduce((all, _ref6) => {
    let [{
      args: [blockOffset]
    }, optData] = _ref6;
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

function useWinningData(auctionInfo) {
  var _api$events$auctions, _api$query$auctions, _api$query$auctions2;

  const {
    api
  } = (0, _reactHooks.useApi)();
  const mountedRef = (0, _reactHooks.useIsMountedRef)();
  const ranges = (0, _useLeaseRanges.useLeaseRanges)();
  const [result, setResult] = (0, _react.useState)();
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const trigger = (0, _reactHooks.useEventTrigger)([(_api$events$auctions = api.events.auctions) === null || _api$events$auctions === void 0 ? void 0 : _api$events$auctions.BidAccepted]);
  const triggerRef = (0, _react.useRef)(trigger);
  const initialEntries = (0, _reactHooks.useCall)((_api$query$auctions = api.query.auctions) === null || _api$query$auctions === void 0 ? void 0 : _api$query$auctions.winning.entries);
  const optFirstData = (0, _reactHooks.useCall)((_api$query$auctions2 = api.query.auctions) === null || _api$query$auctions2 === void 0 ? void 0 : _api$query$auctions2.winning, FIRST_PARAM); // should be fired once, all entries as an initial round

  (0, _react.useEffect)(() => {
    mountedRef.current && auctionInfo && initialEntries && setResult(extractData(ranges, auctionInfo, initialEntries));
  }, [auctionInfo, initialEntries, mountedRef, ranges]); // when block 0 changes, update (typically in non-ending-period, static otherwise)

  (0, _react.useEffect)(() => {
    mountedRef.current && auctionInfo && optFirstData && setResult(prev => mergeFirst(ranges, auctionInfo, prev, optFirstData));
  }, [auctionInfo, optFirstData, mountedRef, ranges]); // on a bid event, get the new entry (assuming the event really triggered, i.e. not just a block)
  // and add it to the list when not duplicated. Additionally we cleanup after ourselves when endBlock
  // gets cleared

  (0, _react.useEffect)(() => {
    if (auctionInfo !== null && auctionInfo !== void 0 && auctionInfo.endBlock && bestNumber && bestNumber.gt(auctionInfo.endBlock) && triggerRef.current !== trigger) {
      var _api$query$auctions3;

      const blockOffset = bestNumber.sub(auctionInfo.endBlock).iadd(_util.BN_ONE);
      triggerRef.current = trigger;
      (_api$query$auctions3 = api.query.auctions) === null || _api$query$auctions3 === void 0 ? void 0 : _api$query$auctions3.winning(blockOffset).then(optCurrent => mountedRef.current && setResult(prev => mergeCurrent(ranges, auctionInfo, prev, optCurrent, blockOffset))).catch(console.error);
    }
  }, [api, bestNumber, auctionInfo, mountedRef, ranges, trigger, triggerRef]);
  return result;
}