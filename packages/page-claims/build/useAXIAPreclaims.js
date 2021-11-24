// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useAccounts, useApi, useCall, useIsMountedRef } from '@axia-js/react-hooks';
export default function useAXIAPreclaims() {
  var _api$query$claims, _api$query$claims$pre;

  const {
    allAccounts
  } = useAccounts();
  const {
    api
  } = useApi();
  const mountedRef = useIsMountedRef();
  const [needsAttest, setNeedsAttest] = useState([]); // find all own preclaims

  const preclaims = useCall((_api$query$claims = api.query.claims) === null || _api$query$claims === void 0 ? void 0 : (_api$query$claims$pre = _api$query$claims.preclaims) === null || _api$query$claims$pre === void 0 ? void 0 : _api$query$claims$pre.multi, [allAccounts], {
    transform: preclaims => preclaims.map((opt, index) => [allAccounts[index], opt]).filter(([, opt]) => opt.isSome).map(([address, opt]) => [address, opt.unwrap()])
  }); // Filter the accounts that need attest. They are accounts that
  // - already preclaimed
  // - has a balance, either vested or normal

  useEffect(() => {
    preclaims && api.queryMulti(preclaims.reduce((result, [, ethAddr]) => result.concat([[api.query.claims.claims, ethAddr], [api.query.claims.vesting, ethAddr]]), []), opts => {
      // filter the cases where either claims or vesting has a value
      mountedRef.current && setNeedsAttest(preclaims.filter((_, index) => opts[index * 2].isSome || opts[index * 2 + 1].isSome).map(([address]) => address));
    });
  }, [api, allAccounts, mountedRef, preclaims]);
  return needsAttest;
}