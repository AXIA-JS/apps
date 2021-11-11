// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';
import { BN_ZERO } from '@axia-js/util';
import { approxChanges } from "./util.js";
export default function useChangeCalc(threshold, votedAye, votedNay, votedTotal) {
  const {
    api
  } = useApi();
  const sqrtElectorate = useCall(api.derive.democracy.sqrtElectorate);
  const [result, setResult] = useState({
    changeAye: BN_ZERO,
    changeNay: BN_ZERO
  });
  useEffect(() => {
    sqrtElectorate && setResult(approxChanges(threshold, sqrtElectorate, {
      votedAye,
      votedNay,
      votedTotal
    }));
  }, [sqrtElectorate, threshold, votedAye, votedNay, votedTotal]);
  return result;
}