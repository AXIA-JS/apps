// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
export default function useOwnNominators(ownStashes) {
  return useMemo(() => ownStashes && ownStashes.filter(({
    isOwnController,
    isStashValidating
  }) => isOwnController && !isStashValidating), [ownStashes]);
}