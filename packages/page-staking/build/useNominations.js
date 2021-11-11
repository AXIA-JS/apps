// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';

function extractNominators(nominations) {
  return nominations.reduce((mapped, [key, optNoms]) => {
    if (optNoms.isSome && key.args.length) {
      const nominatorId = key.args[0].toString();
      const {
        submittedIn,
        targets
      } = optNoms.unwrap();
      targets.forEach((_validatorId, index) => {
        const validatorId = _validatorId.toString();

        const info = {
          index: index + 1,
          nominatorId,
          submittedIn
        };

        if (!mapped[validatorId]) {
          mapped[validatorId] = [info];
        } else {
          mapped[validatorId].push(info);
        }
      });
    }

    return mapped;
  }, {});
}

export default function useNominations(isActive = true) {
  const {
    api
  } = useApi();
  const nominators = useCall(isActive && api.query.staking.nominators.entries);
  return useMemo(() => nominators && extractNominators(nominators), [nominators]);
}