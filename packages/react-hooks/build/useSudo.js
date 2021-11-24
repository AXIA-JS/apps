// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useAccounts } from "./useAccounts.js";
import { useApi } from "./useApi.js";
import { useCall } from "./useCall.js";
const transformSudo = {
  transform: key => key.toString()
};
export function useSudo() {
  var _api$query$sudo;

  const {
    api
  } = useApi();
  const {
    allAccounts,
    hasAccounts
  } = useAccounts();
  const sudoKey = useCall(hasAccounts && ((_api$query$sudo = api.query.sudo) === null || _api$query$sudo === void 0 ? void 0 : _api$query$sudo.key), undefined, transformSudo);
  const [hasSudoKey, setHasSudoKey] = useState(false);
  useEffect(() => {
    setHasSudoKey(!!sudoKey && !!allAccounts && allAccounts.some(key => key === sudoKey));
  }, [allAccounts, sudoKey]);
  return {
    allAccounts,
    hasSudoKey,
    sudoKey
  };
}