// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { getInflationParams } from '@axia-js/apps-config';
import { BN_MILLION, BN_ZERO } from '@axia-js/util';
import { useApi } from "./useApi.js";
import { useCall } from "./useCall.js";
const EMPTY = {
  idealInterest: 0,
  idealStake: 0,
  inflation: 0,
  stakedFraction: 0,
  stakedReturn: 0
};

function calcInflation(api, totalStaked, totalIssuance, numAuctions) {
  const {
    auctionAdjust,
    auctionMax,
    falloff,
    maxInflation,
    minInflation,
    stakeTarget
  } = getInflationParams(api);
  const stakedFraction = totalStaked.isZero() || totalIssuance.isZero() ? 0 : totalStaked.mul(BN_MILLION).div(totalIssuance).toNumber() / BN_MILLION.toNumber();
  const idealStake = stakeTarget - Math.min(auctionMax, numAuctions.toNumber()) * auctionAdjust;
  const idealInterest = maxInflation / idealStake;
  const inflation = 100 * (minInflation + (stakedFraction <= idealStake ? stakedFraction * (idealInterest - minInflation / idealStake) : (idealInterest * idealStake - minInflation) * Math.pow(2, (idealStake - stakedFraction) / falloff)));
  return {
    idealInterest,
    idealStake,
    inflation,
    stakedFraction,
    stakedReturn: stakedFraction ? inflation / stakedFraction : 0
  };
}

export function useInflation(totalStaked) {
  var _api$query$balances, _api$query$auctions;

  const {
    api
  } = useApi();
  const totalIssuance = useCall((_api$query$balances = api.query.balances) === null || _api$query$balances === void 0 ? void 0 : _api$query$balances.totalIssuance);
  const auctionCounter = useCall((_api$query$auctions = api.query.auctions) === null || _api$query$auctions === void 0 ? void 0 : _api$query$auctions.auctionCounter);
  const [state, setState] = useState(EMPTY);
  useEffect(() => {
    const numAuctions = api.query.auctions ? auctionCounter : BN_ZERO;
    numAuctions && totalIssuance && totalStaked && setState(calcInflation(api, totalStaked, totalIssuance, numAuctions));
  }, [api, auctionCounter, totalIssuance, totalStaked]);
  return state;
}