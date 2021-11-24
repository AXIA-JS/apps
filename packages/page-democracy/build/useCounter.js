// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useAccounts, useApi, useCall, useIsMountedRef } from '@axia-js/react-hooks';
export default function useCounter() {
  var _api$derive$democracy, _api$derive$democracy2;

  const {
    hasAccounts
  } = useAccounts();
  const {
    api,
    isApiReady
  } = useApi();
  const mountedRef = useIsMountedRef();
  const proposals = useCall(isApiReady && hasAccounts && ((_api$derive$democracy = api.derive.democracy) === null || _api$derive$democracy === void 0 ? void 0 : _api$derive$democracy.proposals));
  const referenda = useCall(isApiReady && hasAccounts && ((_api$derive$democracy2 = api.derive.democracy) === null || _api$derive$democracy2 === void 0 ? void 0 : _api$derive$democracy2.referendumsActive));
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    mountedRef.current && setCounter(((proposals === null || proposals === void 0 ? void 0 : proposals.length) || 0) + ((referenda === null || referenda === void 0 ? void 0 : referenda.length) || 0));
  }, [mountedRef, proposals, referenda]);
  return counter;
}