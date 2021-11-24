// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { isFunction } from '@axia-js/util';
import { useApi } from "./useApi.js";
import { useBestNumber } from "./useBestNumber.js";
const DEFAULT_STATUS = {
  hasFailed: false,
  hasPassed: false,
  isCloseable: false,
  isVoteable: false,
  remainingBlocks: null
};

function getStatus(api, bestNumber, votes, numMembers, section) {
  var _api$tx;

  const [instance] = api.registry.getModuleInstances(api.runtimeVersion.specName.toString(), section) || [section];
  const modLocation = isFunction((_api$tx = api.tx[instance]) === null || _api$tx === void 0 ? void 0 : _api$tx.close) ? instance : null;

  if (!votes.end || !modLocation) {
    return {
      hasFailed: false,
      hasPassed: false,
      isCloseable: false,
      isVoteable: true,
      remainingBlocks: null
    };
  }

  const isEnd = bestNumber.gte(votes.end);
  const hasPassed = votes.threshold.lten(votes.ayes.length);
  const hasFailed = votes.threshold.gtn(Math.abs(numMembers - votes.nays.length));
  return {
    hasFailed,
    hasPassed,
    isCloseable: api.tx[modLocation].close.meta.args.length === 4 // current-generation
    ? isEnd || hasPassed || hasFailed : isEnd,
    isVoteable: !isEnd,
    remainingBlocks: isEnd ? null : votes.end.sub(bestNumber)
  };
}

export function useVotingStatus(votes, numMembers, section) {
  const {
    api
  } = useApi();
  const bestNumber = useBestNumber();
  return useMemo(() => bestNumber && votes ? getStatus(api, bestNumber, votes, numMembers, section) : DEFAULT_STATUS, [api, bestNumber, numMembers, section, votes]);
}