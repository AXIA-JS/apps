// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { useApi, useBestNumber } from '@axia-js/react-hooks';
export default function useLeasePeriod() {
  const {
    api
  } = useApi();
  const bestNumber = useBestNumber();
  return useMemo(() => {
    if (!api.consts.slots.leasePeriod || !bestNumber) {
      return;
    }

    const length = api.consts.slots.leasePeriod;
    const progress = bestNumber.mod(length);
    return {
      currentPeriod: bestNumber.div(length),
      length,
      progress,
      remainder: length.sub(progress)
    };
  }, [api, bestNumber]);
}