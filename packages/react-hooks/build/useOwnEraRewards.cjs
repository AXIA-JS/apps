"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOwnEraRewards = useOwnEraRewards;

var _react = require("react");

var _util = require("@axia-js/util");

var _useApi = require("./useApi.cjs");

var _useCall = require("./useCall.cjs");

var _useIsMountedRef = require("./useIsMountedRef.cjs");

var _useOwnStashes = require("./useOwnStashes.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
const EMPTY_FILTERED = {
  filteredEras: [],
  validatorEras: []
};
const EMPTY_STATE = {
  isLoadingRewards: true,
  rewardCount: 0
};

function getRewards(_ref) {
  let [[stashIds], available] = _ref;
  const allRewards = {};
  stashIds.forEach((stashId, index) => {
    allRewards[stashId] = available[index].filter(_ref2 => {
      let {
        eraReward
      } = _ref2;
      return !eraReward.isZero();
    });
  });
  return {
    allRewards,
    isLoadingRewards: false,
    rewardCount: Object.values(allRewards).filter(rewards => rewards.length !== 0).length
  };
}

function getValRewards(api, validatorEras, erasPoints, erasRewards) {
  const allRewards = {};
  validatorEras.forEach(_ref3 => {
    let {
      eras,
      stashId
    } = _ref3;
    eras.forEach(era => {
      const eraPoints = erasPoints.find(p => p.era.eq(era));
      const eraRewards = erasRewards.find(r => r.era.eq(era));

      if (eraPoints !== null && eraPoints !== void 0 && eraPoints.eraPoints.gt(_util.BN_ZERO) && eraPoints !== null && eraPoints !== void 0 && eraPoints.validators[stashId] && eraRewards) {
        const reward = eraPoints.validators[stashId].mul(eraRewards.eraReward).div(eraPoints.eraPoints);

        if (!reward.isZero()) {
          const total = api.createType('Balance', reward);

          if (!allRewards[stashId]) {
            allRewards[stashId] = [];
          }

          allRewards[stashId].push({
            era,
            eraReward: eraRewards.eraReward,
            isEmpty: false,
            isValidator: true,
            nominating: [],
            validators: {
              [stashId]: {
                total,
                value: total
              }
            }
          });
        }
      }
    });
  });
  return {
    allRewards,
    isLoadingRewards: false,
    rewardCount: Object.values(allRewards).filter(rewards => rewards.length !== 0).length
  };
}

function useOwnEraRewards(maxEras, ownValidators) {
  var _api$derive$staking, _api$derive$staking2;

  const {
    api
  } = (0, _useApi.useApi)();
  const mountedRef = (0, _useIsMountedRef.useIsMountedRef)();
  const stashIds = (0, _useOwnStashes.useOwnStashIds)();
  const allEras = (0, _useCall.useCall)((_api$derive$staking = api.derive.staking) === null || _api$derive$staking === void 0 ? void 0 : _api$derive$staking.erasHistoric);
  const [{
    filteredEras,
    validatorEras
  }, setFiltered] = (0, _react.useState)(EMPTY_FILTERED);
  const [state, setState] = (0, _react.useState)(EMPTY_STATE);
  const stakerRewards = (0, _useCall.useCall)(!(ownValidators !== null && ownValidators !== void 0 && ownValidators.length) && !!filteredEras.length && stashIds && ((_api$derive$staking2 = api.derive.staking) === null || _api$derive$staking2 === void 0 ? void 0 : _api$derive$staking2.stakerRewardsMultiEras), [stashIds, filteredEras], {
    withParams: true
  });
  const erasPoints = (0, _useCall.useCall)(!!validatorEras.length && !!filteredEras.length && api.derive.staking._erasPoints, [filteredEras, false]);
  const erasRewards = (0, _useCall.useCall)(!!validatorEras.length && !!filteredEras.length && api.derive.staking._erasRewards, [filteredEras, false]);
  (0, _react.useEffect)(() => {
    setState({
      allRewards: null,
      isLoadingRewards: true,
      rewardCount: 0
    });
  }, [maxEras, ownValidators]);
  (0, _react.useEffect)(() => {
    if (allEras && maxEras) {
      const filteredEras = allEras.slice(-1 * maxEras);
      const validatorEras = [];

      if (allEras.length === 0) {
        setState({
          allRewards: {},
          isLoadingRewards: false,
          rewardCount: 0
        });
        setFiltered({
          filteredEras,
          validatorEras
        });
      } else if (ownValidators !== null && ownValidators !== void 0 && ownValidators.length) {
        ownValidators.forEach(_ref4 => {
          let {
            stakingLedger,
            stashId
          } = _ref4;

          if (stakingLedger) {
            const eras = filteredEras.filter(era => !stakingLedger.claimedRewards.some(c => era.eq(c)));

            if (eras.length) {
              validatorEras.push({
                eras,
                stashId
              });
            }
          }
        }); // When we have just claimed, we have filtered eras, but no validator eras - set accordingly

        if (filteredEras.length && !validatorEras.length) {
          setState({
            allRewards: {},
            isLoadingRewards: false,
            rewardCount: 0
          });
        }
      }

      setFiltered({
        filteredEras,
        validatorEras
      });
    }
  }, [allEras, maxEras, ownValidators]);
  (0, _react.useEffect)(() => {
    mountedRef.current && stakerRewards && !ownValidators && setState(getRewards(stakerRewards));
  }, [mountedRef, ownValidators, stakerRewards]);
  (0, _react.useEffect)(() => {
    mountedRef && erasPoints && erasRewards && ownValidators && setState(getValRewards(api, validatorEras, erasPoints, erasRewards));
  }, [api, erasPoints, erasRewards, mountedRef, ownValidators, validatorEras]);
  return state;
}