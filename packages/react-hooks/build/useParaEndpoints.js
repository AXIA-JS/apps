import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { createWsEndpoints } from '@axia-js/apps-config';
import { bnToBn } from '@axia-js/util';
import { useApi } from "./useApi.js";
const endpoints = createWsEndpoints((key, value) => value || key);

function extractRelayEndpoints(genesisHash) {
  return endpoints.filter(({
    genesisHashRelay
  }) => genesisHash === genesisHashRelay);
}

function extractParaEndpoints(allEndpoints, paraId) {
  const numId = bnToBn(paraId).toNumber();
  return allEndpoints.filter(({
    paraId
  }) => paraId === numId);
}

export function useRelayEndpoints() {
  const {
    api
  } = useApi();
  return useMemo(() => extractRelayEndpoints(api.genesisHash.toHex()), [api]);
}
export function useParaEndpoints(paraId) {
  const endpoints = useRelayEndpoints();
  return useMemo(() => extractParaEndpoints(endpoints, paraId), [endpoints, paraId]);
}
export function useIsParasLinked(ids) {
  const endpoints = useRelayEndpoints();
  return useMemo(() => ids ? ids.reduce((all, id) => _objectSpread(_objectSpread({}, all), {}, {
    [id.toString()]: extractParaEndpoints(endpoints, id).length !== 0
  }), {}) : {}, [endpoints, ids]);
}