// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { VoteThreshold } from '@axia-js/types/interfaces';

import { useEffect, useState } from 'react';

import { useApi, useCall } from '@axia-js/react-hooks';
import { BN_ZERO } from '@axia-js/util';

import { approxChanges } from './util';

interface Result {
  changeAye: BN;
  changeNay: BN;
}

export default function useChangeCalc (threshold: VoteThreshold, votedAye: BN, votedNay: BN, votedTotal: BN): Result {
  const { api } = useApi();
  const sqrtElectorate = useCall<BN>(api.derive.democracy.sqrtElectorate);
  const [result, setResult] = useState<Result>({ changeAye: BN_ZERO, changeNay: BN_ZERO });

  useEffect((): void => {
    sqrtElectorate && setResult(
      approxChanges(threshold, sqrtElectorate, { votedAye, votedNay, votedTotal })
    );
  }, [sqrtElectorate, threshold, votedAye, votedNay, votedTotal]);

  return result;
}
