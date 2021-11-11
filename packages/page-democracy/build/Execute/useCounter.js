// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useApi, useCall } from '@axia-js/react-hooks';
export default function useCounter() {
  const {
    api
  } = useApi();
  const queued = useCall(api.derive.democracy.dispatchQueue);
  return (queued === null || queued === void 0 ? void 0 : queued.length) || 0;
}