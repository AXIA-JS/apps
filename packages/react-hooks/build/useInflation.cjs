"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInflation = useInflation;

var _react = require("react");

var _appsConfig = require("@axia-js/apps-config");

var _util = require("@axia-js/util");

var _useApi = require("./useApi.cjs");

var _useCall = require("./useCall.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
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
  } = (0, _appsConfig.getInflationParams)(api);
  const stakedFraction = totalStaked.isZero() || totalIssuance.isZero() ? 0 : totalStaked.mul(_util.BN_MILLION).div(totalIssuance).toNumber() / _util.BN_MILLION.toNumber();
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

function useInflation(totalStaked) {
  var _api$query$balances, _api$query$auctions;

  const {
    api
  } = (0, _useApi.useApi)();
  const totalIssuance = (0, _useCall.useCall)((_api$query$balances = api.query.balances) === null || _api$query$balances === void 0 ? void 0 : _api$query$balances.totalIssuance);
  const auctionCounter = (0, _useCall.useCall)((_api$query$auctions = api.query.auctions) === null || _api$query$auctions === void 0 ? void 0 : _api$query$auctions.auctionCounter);
  const [state, setState] = (0, _react.useState)(EMPTY);
  (0, _react.useEffect)(() => {
    const numAuctions = api.query.auctions ? auctionCounter : _util.BN_ZERO;
    numAuctions && totalIssuance && totalStaked && setState(calcInflation(api, totalStaked, totalIssuance, numAuctions));
  }, [api, auctionCounter, totalIssuance, totalStaked]);
  return state;
}