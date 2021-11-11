// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useCallback } from 'react';
import { getBountyStatus } from '@axia-js/app-bounties/helpers';
export function useBountyStatus(status) {
  const updateStatus = useCallback(() => getBountyStatus(status), [status]);
  return updateStatus();
}