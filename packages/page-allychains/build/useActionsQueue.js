// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';
import { BN_EIGHT, BN_FIVE, BN_FOUR, BN_NINE, BN_ONE, BN_SEVEN, BN_SIX, BN_TEN, BN_THREE, BN_TWO } from '@axia-js/util';
const INC = [BN_ONE, BN_TWO, BN_THREE, BN_FOUR, BN_FIVE, BN_SIX, BN_SEVEN, BN_EIGHT, BN_NINE, BN_TEN];
const callOpts = {
  withParams: true
};
export default function useActionsQueue() {
  const {
    api
  } = useApi();
  const currentIndex = useCall(api.query.session.currentIndex);
  const queryIndexes = useMemo(() => currentIndex && INC.map(i => currentIndex.add(i)), [currentIndex]);
  const nextActions = useCall(queryIndexes && api.query.paras.actionsQueue.multi, [queryIndexes], callOpts);
  return useMemo(() => nextActions ? nextActions[0][0].map((sessionIndex, index) => ({
    allyIds: nextActions[1][index],
    sessionIndex
  })).filter(({
    allyIds
  }) => allyIds.length) : [], [nextActions]);
}