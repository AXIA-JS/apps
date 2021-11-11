// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useApi } from "./useApi.js";
import { useCall } from "./useCall.js";
export function useSubidentities(address) {
  var _useCall, _api$query$identity;

  const {
    api
  } = useApi();
  return (_useCall = useCall((_api$query$identity = api.query.identity) === null || _api$query$identity === void 0 ? void 0 : _api$query$identity.subsOf, [address])) === null || _useCall === void 0 ? void 0 : _useCall[1];
}