// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import { useEffect, useState } from 'react';
import { BN_ONE } from '@axia-js/util';
import { useApi } from "./useApi.js";
import { useCall } from "./useCall.js";
import { useIsMountedRef } from "./useIsMountedRef.js";
export function useAvailableSlashes() {
  var _api$derive$session, _api$query$staking;

  const {
    api
  } = useApi();
  const indexes = useCall((_api$derive$session = api.derive.session) === null || _api$derive$session === void 0 ? void 0 : _api$derive$session.indexes);
  const earliestSlash = useCall((_api$query$staking = api.query.staking) === null || _api$query$staking === void 0 ? void 0 : _api$query$staking.earliestUnappliedSlash);
  const mountedRef = useIsMountedRef();
  const [slashes, setSlashes] = useState([]);
  useEffect(() => {
    let unsub;

    if (mountedRef.current && indexes && earliestSlash && earliestSlash.isSome) {
      const from = earliestSlash.unwrap();
      const range = [];
      let start = new BN(from); // any <= activeEra (we include activeEra since slashes are immediately reflected)

      while (start.lte(indexes.activeEra)) {
        range.push(start);
        start = start.add(BN_ONE);
      }

      if (range.length) {
        (async () => {
          unsub = await api.query.staking.unappliedSlashes.multi(range, values => {
            mountedRef.current && setSlashes(values.map((value, index) => [from.addn(index), value]).filter(([, slashes]) => slashes.length));
          });
        })().catch(console.error);
      }
    }

    return () => {
      unsub && unsub();
    };
  }, [api, earliestSlash, indexes, mountedRef]);
  return slashes;
}