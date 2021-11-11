import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { createWsEndpoints } from '@axia-js/apps-config';
import { isNumber } from '@axia-js/util';
import { useApi } from "./useApi.js";
import { useCall } from "./useCall.js";
const DEFAULT_STATE = {
  allowTeleport: false,
  destinations: [],
  oneWay: []
};
const endpoints = createWsEndpoints((k, v) => v || k).filter(v => !!v.teleport);

function extractRelayDestinations(relayGenesis, filter) {
  return endpoints.filter(l => (l.genesisHashRelay === relayGenesis || l.genesisHash === relayGenesis) && filter(l)).reduce((result, curr) => {
    const isExisting = result.some(({
      genesisHash,
      paraId
    }) => paraId === curr.paraId || genesisHash && genesisHash === curr.genesisHash);

    if (!isExisting) {
      result.push(curr);
    }

    return result;
  }, []).sort((a, b) => a.isRelay === b.isRelay ? 0 : a.isRelay ? -1 : 1);
}

export function useTeleport() {
  var _api$query$parachainI;

  const {
    api,
    apiUrl,
    isApiReady
  } = useApi();
  const paraId = useCall(isApiReady && ((_api$query$parachainI = api.query.parachainInfo) === null || _api$query$parachainI === void 0 ? void 0 : _api$query$parachainI.parachainId));
  const [state, setState] = useState(() => _objectSpread({}, DEFAULT_STATE));
  useEffect(() => {
    if (isApiReady) {
      const relayGenesis = api.genesisHash.toHex();
      const endpoint = endpoints.find(({
        genesisHash
      }) => genesisHash === relayGenesis);

      if (endpoint) {
        const destinations = extractRelayDestinations(relayGenesis, ({
          paraId
        }) => isNumber(paraId) && endpoint.teleport.includes(paraId));
        const oneWay = extractRelayDestinations(relayGenesis, ({
          paraId,
          teleport
        }) => isNumber(paraId) && !teleport.includes(-1)).map(({
          paraId
        }) => paraId || -1);
        setState({
          allowTeleport: destinations.length !== 0,
          destinations,
          isRelayTeleport: true,
          oneWay
        });
      }
    }
  }, [api, isApiReady]);
  useEffect(() => {
    if (paraId) {
      const endpoint = endpoints.find(({
        value
      }) => value === apiUrl);

      if (endpoint && endpoint.genesisHashRelay) {
        const destinations = extractRelayDestinations(endpoint.genesisHashRelay, ({
          paraId
        }) => endpoint.teleport.includes(isNumber(paraId) ? paraId : -1));
        const oneWay = extractRelayDestinations(endpoint.genesisHashRelay, ({
          paraId,
          teleport
        }) => !teleport.includes(isNumber(paraId) ? paraId : -1)).map(({
          paraId
        }) => paraId || -1);
        setState({
          allowTeleport: destinations.length !== 0,
          destinations,
          isParaTeleport: true,
          oneWay
        });
      }
    }
  }, [apiUrl, paraId]);
  return state;
}