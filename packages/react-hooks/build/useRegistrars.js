// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { useAccounts } from "./useAccounts.js";
import { useApi } from "./useApi.js";
import { useCall } from "./useCall.js";
export function useRegistrars(skipQuery) {
  var _api$query$identity;

  const {
    api
  } = useApi();
  const {
    allAccounts,
    hasAccounts
  } = useAccounts();
  const query = useCall(!skipQuery && hasAccounts && ((_api$query$identity = api.query.identity) === null || _api$query$identity === void 0 ? void 0 : _api$query$identity.registrars)); // determine if we have a registrar or not - registrars are allowed to approve

  return useMemo(() => {
    const registrars = (query || []).map((registrar, index) => ({
      address: registrar.isSome ? registrar.unwrap().account.toString() : null,
      index
    })).filter(registrar => !!registrar.address);
    return {
      isRegistrar: registrars.some(({
        address
      }) => allAccounts.includes(address)),
      registrars
    };
  }, [allAccounts, query]);
}