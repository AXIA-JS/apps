// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { BN_ZERO } from '@axia-js/util';
import { useApi } from "./useApi.js";
import { useCall } from "./useCall.js";
import { useIsMountedRef } from "./useIsMountedRef.js";
import { useOwnStashIds } from "./useOwnStashes.js";
const EMPTY_FILTERED = {
  filteredEras: [],
  validatorEras: []
};
const EMPTY_STATE = {
  isLoadingRewards: true,
  rewardCount: 0
};

function getRewards([[stashIds], available]) {
  const allRewards = {};
  stashIds.forEach((stashId, index) => {
    allRewards[stashId] = available[index].filter(({
      eraReward
    }) => !eraReward.isZero());
  });
  return {
    allRewards,
    isLoadingRewards: false,
    rewardCount: Object.values(allRewards).filter(rewards => rewards.length !== 0).length
  };
}

function getValRewards(api, validatorEras, erasPoints, erasRewards) {
  const allRewards = {};
  validatorEras.forEach(({
    eras,
    stashId
  }) => {
    eras.forEach(era => {
      const eraPoints = erasPoints.find(p => p.era.eq(era));
      const eraRewards = erasRewards.find(r => r.era.eq(era));

      if (eraPoints !== null && eraPoints !== void 0 && eraPoints.eraPoints.gt(BN_ZERO) && eraPoints !== null && eraPoints !== void 0 && eraPoints.validators[stashId] && eraRewards) {
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

export function useOwnEraRewards(maxEras, ownValidators) {
  var _api$derive$staking, _api$derive$staking2;

  const {
    api
  } = useApi();
  const mountedRef = useIsMountedRef();
  const stashIds = useOwnStashIds();
  const allEras = useCall((_api$derive$staking = api.derive.staking) === null || _api$derive$staking === void 0 ? void 0 : _api$derive$staking.erasHistoric);
  const [{
    filteredEras,
    validatorEras
  }, setFiltered] = useState(EMPTY_FILTERED);
  const [state, setState] = useState(EMPTY_STATE);
  const stakerRewards = useCall(!(ownValidators !== null && ownValidators !== void 0 && ownValidators.length) && !!filteredEras.length && stashIds && ((_api$derive$staking2 = api.derive.staking) === null || _api$derive$staking2 === void 0 ? void 0 : _api$derive$staking2.stakerRewardsMultiEras), [stashIds, filteredEras], {
    withParams: true
  });
  const erasPoints = useCall(!!validatorEras.length && !!filteredEras.length && api.derive.staking._erasPoints, [filteredEras, false]);
  const erasRewards = useCall(!!validatorEras.length && !!filteredEras.length && api.derive.staking._erasRewards, [filteredEras, false]);
  useEffect(() => {
    setState({
      allRewards: null,
      isLoadingRewards: true,
      rewardCount: 0
    });
  }, [maxEras, ownValidators]);
  useEffect(() => {
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
        ownValidators.forEach(({
          stakingLedger,
          stashId
        }) => {
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
  useEffect(() => {
    mountedRef.current && stakerRewards && !ownValidators && setState(getRewards(stakerRewards));
  }, [mountedRef, ownValidators, stakerRewards]);
  useEffect(() => {
    mountedRef && erasPoints && erasRewards && ownValidators && setState(getValRewards(api, validatorEras, erasPoints, erasRewards));
  }, [api, erasPoints, erasRewards, mountedRef, ownValidators, validatorEras]);
  return state;
}