// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';
import { BN_ONE } from '@axia-js/util';
export default function useEraBlocks(era) {
  const {
    api
  } = useApi();
  const depth = useCall(api.query.staking.historyDepth);
  const progress = useCall(api.derive.session.progress);
  const forcing = useCall(api.query.staking.forceEra);
  return useMemo(() => depth && era && forcing && progress && progress.sessionLength.gt(BN_ONE) ? (forcing.isForceAlways ? progress.sessionLength : progress.eraLength).mul(depth.sub(progress.activeEra).iadd(era).iadd(BN_ONE)).isub(forcing.isForceAlways ? progress.sessionProgress : progress.eraProgress) : undefined, [depth, era, forcing, progress]);
}