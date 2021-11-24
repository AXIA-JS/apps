// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { useApi } from '@axia-js/react-hooks';
import { getAllRpc } from "./rpcs.js";
export default function useRpcs() {
  const {
    api
  } = useApi();
  return useMemo(() => getAllRpc(api.registry, api.runtimeChain, api.runtimeVersion), [api]);
}