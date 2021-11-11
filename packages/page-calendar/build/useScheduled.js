import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useLeaseRangeMax } from '@axia-js/app-parachains/useLeaseRanges';
import { useApi, useBestNumber, useBlockTime, useCall } from '@axia-js/react-hooks';
import { BN_ONE, BN_ZERO } from '@axia-js/util';

function newDate(blocks, blockTime) {
  const date = new Date(Date.now() + blocks.muln(blockTime).toNumber());
  return {
    date,
    dateTime: date.getTime()
  };
}

function createConstDurations(bestNumber, blockTime, items) {
  return items.map(([type, duration, additional = BN_ZERO]) => {
    if (!duration) {
      return [type, []];
    }

    const blocks = duration.sub(bestNumber.mod(duration));
    return [type, [_objectSpread(_objectSpread({}, newDate(blocks, blockTime)), {}, {
      blockNumber: bestNumber.add(blocks),
      blocks,
      info: bestNumber.div(duration).iadd(additional)
    })]];
  });
}

function createCouncilMotions(bestNumber, blockTime, motions) {
  return [['councilMotion', motions.map(({
    hash,
    votes
  }) => {
    if (!votes) {
      return null;
    }

    const hashStr = hash.toHex();
    const blocks = votes.end.sub(bestNumber);
    return _objectSpread(_objectSpread({}, newDate(blocks, blockTime)), {}, {
      blockNumber: votes.end,
      blocks,
      info: `${hashStr.substr(0, 6)}…${hashStr.substr(-4)}`
    });
  }).filter(item => !!item)]];
}

function createDispatches(bestNumber, blockTime, dispatches) {
  return dispatches.map(({
    at,
    index
  }) => {
    const blocks = at.sub(bestNumber);
    return ['democracyDispatch', [_objectSpread(_objectSpread({}, newDate(blocks, blockTime)), {}, {
      blockNumber: at,
      blocks,
      info: index
    })]];
  });
}

function createReferendums(bestNumber, blockTime, referendums) {
  return referendums.reduce((result, {
    index,
    status
  }) => {
    const enactBlocks = status.end.add(status.delay).isub(bestNumber);
    const voteBlocks = status.end.sub(bestNumber).isub(BN_ONE);
    result.push(['referendumVote', [_objectSpread(_objectSpread({}, newDate(voteBlocks, blockTime)), {}, {
      blockNumber: bestNumber.add(voteBlocks),
      blocks: voteBlocks,
      info: index
    })]]);
    result.push(['referendumDispatch', [_objectSpread(_objectSpread({}, newDate(enactBlocks, blockTime)), {}, {
      blockNumber: bestNumber.add(enactBlocks),
      blocks: enactBlocks,
      info: index,
      isPending: true
    })]]);
    return result;
  }, []);
}

function createStakingInfo(bestNumber, blockTime, sessionInfo, unapplied, slashDeferDuration) {
  const blocksEra = sessionInfo.eraLength.sub(sessionInfo.eraProgress);
  const blocksSes = sessionInfo.sessionLength.sub(sessionInfo.sessionProgress);
  const slashDuration = slashDeferDuration === null || slashDeferDuration === void 0 ? void 0 : slashDeferDuration.mul(sessionInfo.eraLength);
  const slashEras = slashDuration ? unapplied.filter(([, values]) => values.length).map(([key]) => {
    const eraIndex = key.args[0];
    const blockProgress = sessionInfo.activeEra.sub(eraIndex).isub(BN_ONE).imul(sessionInfo.eraLength).iadd(sessionInfo.eraProgress);
    const blocks = slashDuration.sub(blockProgress);
    return _objectSpread(_objectSpread({}, newDate(blocks, blockTime)), {}, {
      blockNumber: bestNumber.add(blocks),
      blocks,
      info: eraIndex
    });
  }) : [];
  return [['stakingEpoch', [_objectSpread(_objectSpread({}, newDate(blocksSes, blockTime)), {}, {
    blockNumber: bestNumber.add(blocksSes),
    blocks: blocksSes,
    info: sessionInfo.currentIndex.add(BN_ONE)
  })]], ['stakingEra', [_objectSpread(_objectSpread({}, newDate(blocksEra, blockTime)), {}, {
    blockNumber: bestNumber.add(blocksEra),
    blocks: blocksEra,
    info: sessionInfo.activeEra.add(BN_ONE)
  })]], ['stakingSlash', slashEras]];
}

function createScheduled(bestNumber, blockTime, scheduled) {
  return [['scheduler', scheduled.filter(([, vecSchedOpt]) => vecSchedOpt.some(schedOpt => schedOpt.isSome)).reduce((items, [key, vecSchedOpt]) => {
    const blockNumber = key.args[0];
    return vecSchedOpt.filter(schedOpt => schedOpt.isSome).map(schedOpt => schedOpt.unwrap()).reduce((items, {
      maybeId
    }) => {
      const idOrNull = maybeId.unwrapOr(null);
      const blocks = blockNumber.sub(bestNumber);
      items.push(_objectSpread(_objectSpread({}, newDate(blocks, blockTime)), {}, {
        blockNumber,
        blocks,
        info: idOrNull ? idOrNull.isAscii ? idOrNull.toUtf8() : idOrNull.toHex() : null
      }));
      return items;
    }, items);
  }, [])]];
}

function createAuctionInfo(bestNumber, blockTime, rangeMax, [leasePeriod, endBlock]) {
  const blocks = endBlock.sub(bestNumber);
  return [['parachainAuction', [_objectSpread(_objectSpread({}, newDate(blocks, blockTime)), {}, {
    blockNumber: endBlock,
    blocks,
    info: `${leasePeriod.toString()} - ${leasePeriod.add(rangeMax).toString()}`
  })]]];
}

function addFiltered(state, types) {
  return types.reduce((state, [typeFilter, items]) => {
    return state.filter(({
      type
    }) => type !== typeFilter).concat(...items.map(item => {
      item.type = typeFilter;
      return item;
    }));
  }, state);
} // TODO council votes, tips closing


export default function useScheduled() {
  var _api$query$auctions, _api$derive$council, _api$derive$democracy, _api$derive$democracy2, _api$query$scheduler, _api$query$scheduler$, _api$derive$session, _api$query$staking;

  const {
    api
  } = useApi();
  const [blockTime] = useBlockTime();
  const bestNumber = useBestNumber();
  const leaseRangeMax = useLeaseRangeMax();
  const auctionInfo = useCall((_api$query$auctions = api.query.auctions) === null || _api$query$auctions === void 0 ? void 0 : _api$query$auctions.auctionInfo);
  const councilMotions = useCall((_api$derive$council = api.derive.council) === null || _api$derive$council === void 0 ? void 0 : _api$derive$council.proposals);
  const dispatches = useCall((_api$derive$democracy = api.derive.democracy) === null || _api$derive$democracy === void 0 ? void 0 : _api$derive$democracy.dispatchQueue);
  const referendums = useCall((_api$derive$democracy2 = api.derive.democracy) === null || _api$derive$democracy2 === void 0 ? void 0 : _api$derive$democracy2.referendums);
  const scheduled = useCall((_api$query$scheduler = api.query.scheduler) === null || _api$query$scheduler === void 0 ? void 0 : (_api$query$scheduler$ = _api$query$scheduler.agenda) === null || _api$query$scheduler$ === void 0 ? void 0 : _api$query$scheduler$.entries);
  const sessionInfo = useCall((_api$derive$session = api.derive.session) === null || _api$derive$session === void 0 ? void 0 : _api$derive$session.progress);
  const slashes = useCall((_api$query$staking = api.query.staking) === null || _api$query$staking === void 0 ? void 0 : _api$query$staking.unappliedSlashes.entries);
  const [state, setState] = useState([]);
  useEffect(() => {
    bestNumber && dispatches && setState(state => addFiltered(state, createDispatches(bestNumber, blockTime, dispatches)));
  }, [bestNumber, blockTime, dispatches]);
  useEffect(() => {
    bestNumber && councilMotions && setState(state => addFiltered(state, createCouncilMotions(bestNumber, blockTime, councilMotions)));
  }, [bestNumber, blockTime, councilMotions]);
  useEffect(() => {
    bestNumber && referendums && setState(state => addFiltered(state, createReferendums(bestNumber, blockTime, referendums)));
  }, [bestNumber, blockTime, referendums]);
  useEffect(() => {
    bestNumber && scheduled && setState(state => addFiltered(state, createScheduled(bestNumber, blockTime, scheduled)));
  }, [bestNumber, blockTime, scheduled]);
  useEffect(() => {
    bestNumber && (sessionInfo === null || sessionInfo === void 0 ? void 0 : sessionInfo.sessionLength.gt(BN_ONE)) && setState(state => {
      var _api$consts$staking;

      return addFiltered(state, createStakingInfo(bestNumber, blockTime, sessionInfo, slashes || [], (_api$consts$staking = api.consts.staking) === null || _api$consts$staking === void 0 ? void 0 : _api$consts$staking.slashDeferDuration));
    });
  }, [api, bestNumber, blockTime, sessionInfo, slashes]);
  useEffect(() => {
    bestNumber && (auctionInfo === null || auctionInfo === void 0 ? void 0 : auctionInfo.isSome) && setState(state => addFiltered(state, createAuctionInfo(bestNumber, blockTime, leaseRangeMax, auctionInfo.unwrap())));
  }, [auctionInfo, bestNumber, blockTime, leaseRangeMax]);
  useEffect(() => {
    bestNumber && setState(state => {
      var _ref, _api$consts$democracy, _api$consts$slots, _api$consts$society, _api$consts$society2, _api$consts$treasury;

      return addFiltered(state, createConstDurations(bestNumber, blockTime, [['councilElection', (_ref = api.consts.elections || api.consts.phragmenElection || api.consts.electionsPhragmen) === null || _ref === void 0 ? void 0 : _ref.termDuration], ['democracyLaunch', (_api$consts$democracy = api.consts.democracy) === null || _api$consts$democracy === void 0 ? void 0 : _api$consts$democracy.launchPeriod], ['parachainLease', (_api$consts$slots = api.consts.slots) === null || _api$consts$slots === void 0 ? void 0 : _api$consts$slots.leasePeriod, BN_ONE], ['societyChallenge', (_api$consts$society = api.consts.society) === null || _api$consts$society === void 0 ? void 0 : _api$consts$society.challengePeriod], ['societyRotate', (_api$consts$society2 = api.consts.society) === null || _api$consts$society2 === void 0 ? void 0 : _api$consts$society2.rotationPeriod], ['treasurySpend', (_api$consts$treasury = api.consts.treasury) === null || _api$consts$treasury === void 0 ? void 0 : _api$consts$treasury.spendPeriod]]));
    });
  }, [api, bestNumber, blockTime]);
  return state;
}