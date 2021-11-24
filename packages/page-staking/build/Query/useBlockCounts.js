// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useApi, useCall, useIsMountedRef } from '@axia-js/react-hooks';
import { BN_ONE, BN_ZERO, isFunction } from '@axia-js/util';
export default function useBlockCounts(accountId, sessionRewards) {
  var _api$derive$session, _api$query$imOnline;

  const {
    api
  } = useApi();
  const mountedRef = useIsMountedRef();
  const indexes = useCall((_api$derive$session = api.derive.session) === null || _api$derive$session === void 0 ? void 0 : _api$derive$session.indexes);
  const current = useCall((_api$query$imOnline = api.query.imOnline) === null || _api$query$imOnline === void 0 ? void 0 : _api$query$imOnline.authoredBlocks, [indexes === null || indexes === void 0 ? void 0 : indexes.currentIndex, accountId]);
  const [counts, setCounts] = useState([]);
  const [historic, setHistoric] = useState([]);
  useEffect(() => {
    var _api$query$imOnline2;

    if (isFunction((_api$query$imOnline2 = api.query.imOnline) === null || _api$query$imOnline2 === void 0 ? void 0 : _api$query$imOnline2.authoredBlocks) && sessionRewards && sessionRewards.length) {
      const filtered = sessionRewards.filter(({
        sessionIndex
      }) => sessionIndex.gt(BN_ZERO));

      if (filtered.length) {
        Promise.all(filtered.map(({
          parentHash,
          sessionIndex
        }) => api.query.imOnline.authoredBlocks.at(parentHash, sessionIndex.sub(BN_ONE), accountId))).then(historic => {
          mountedRef.current && setHistoric(historic);
        }).catch(console.error);
      }
    }
  }, [accountId, api, mountedRef, sessionRewards]);
  useEffect(() => {
    setCounts([...historic, current || api.createType('u32')].slice(1));
  }, [api, current, historic]);
  return counts;
}