// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useMemo, useState } from 'react';
import { useApi, useBlockTime } from '@axia-js/react-hooks';
import { BN_MILLION, BN_TEN, BN_ZERO } from '@axia-js/util';
export default function useWeight() {
  const {
    api
  } = useApi();
  const [blockTime] = useBlockTime();
  const [megaGas, _setMegaGas] = useState((api.consts.system.blockWeights ? api.consts.system.blockWeights.maxBlock : api.consts.system.maximumBlockWeight).div(BN_MILLION).div(BN_TEN));
  const [isEmpty, setIsEmpty] = useState(false);
  const setMegaGas = useCallback(value => _setMegaGas(value || (api.consts.system.blockWeights ? api.consts.system.blockWeights.maxBlock : api.consts.system.maximumBlockWeight).div(BN_MILLION).div(BN_TEN)), [api]);
  return useMemo(() => {
    let executionTime = 0;
    let percentage = 0;
    let weight = BN_ZERO;
    let isValid = false;

    if (megaGas) {
      weight = megaGas.mul(BN_MILLION);
      executionTime = weight.muln(blockTime).div(api.consts.system.blockWeights ? api.consts.system.blockWeights.maxBlock : api.consts.system.maximumBlockWeight).toNumber();
      percentage = executionTime / blockTime * 100; // execution is 2s of 6s blocks, i.e. 1/3

      executionTime = executionTime / 3000;
      isValid = !megaGas.isZero() && percentage < 65;
    }

    return {
      executionTime,
      isEmpty,
      isValid: isEmpty || isValid,
      megaGas: megaGas || BN_ZERO,
      percentage,
      setIsEmpty,
      setMegaGas,
      weight
    };
  }, [api, blockTime, isEmpty, megaGas, setIsEmpty, setMegaGas]);
}