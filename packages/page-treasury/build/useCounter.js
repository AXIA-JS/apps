// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { useAccounts, useApi, useCall } from '@axia-js/react-hooks';
export default function useCounter() {
  var _api$derive$treasury;

  const {
    hasAccounts
  } = useAccounts();
  const {
    api,
    isApiReady
  } = useApi();
  const proposals = useCall(isApiReady && hasAccounts && ((_api$derive$treasury = api.derive.treasury) === null || _api$derive$treasury === void 0 ? void 0 : _api$derive$treasury.proposals));
  return useMemo(() => (proposals === null || proposals === void 0 ? void 0 : proposals.proposals.length) || 0, [proposals]);
}