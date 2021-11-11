// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';
export default function useCounter() {
  var _api$derive$bounties;

  const {
    api,
    isApiReady
  } = useApi();
  const bounties = useCall(isApiReady && ((_api$derive$bounties = api.derive.bounties) === null || _api$derive$bounties === void 0 ? void 0 : _api$derive$bounties.bounties));
  return useMemo(() => (bounties === null || bounties === void 0 ? void 0 : bounties.length) || 0, [bounties]);
}