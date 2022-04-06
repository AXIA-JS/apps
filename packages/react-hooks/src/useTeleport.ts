// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { LinkOption } from '@axia-js/apps-config/endpoints/types';
import type { AllyId } from '@axia-js/types/interfaces';

import { useEffect, useState } from 'react';

import { createWsEndpoints } from '@axia-js/apps-config';
import { isNumber } from '@axia-js/util';

import { useApi } from './useApi';
import { useCall } from './useCall';

interface Teleport {
  allowTeleport: boolean;
  destinations: LinkOption[];
  isParaTeleport?: boolean;
  isRelayTeleport?: boolean;
  oneWay: number[]
}

interface ExtLinkOption extends LinkOption {
  teleport: number[];
}

const DEFAULT_STATE: Teleport = {
  allowTeleport: false,
  destinations: [],
  oneWay: []
};

const endpoints = createWsEndpoints((k: string, v?: string) => v || k).filter((v): v is ExtLinkOption => !!v.teleport);

function extractRelayDestinations (relayGenesis: string, filter: (l: ExtLinkOption) => boolean): ExtLinkOption[] {
  return endpoints
    .filter((l) =>
      (
        l.genesisHashRelay === relayGenesis ||
        l.genesisHash === relayGenesis
      ) && filter(l)
    )
    .reduce((result: ExtLinkOption[], curr): ExtLinkOption[] => {
      const isExisting = result.some(({ genesisHash, allyId }) =>
        allyId === curr.allyId ||
        (genesisHash && genesisHash === curr.genesisHash)
      );

      if (!isExisting) {
        result.push(curr);
      }

      return result;
    }, [])
    .sort((a, b) =>
      a.isRelay === b.isRelay
        ? 0
        : a.isRelay
          ? -1
          : 1
    );
}

export function useTeleport (): Teleport {
  const { api, apiUrl, isApiReady } = useApi();
  const allyId = useCall<AllyId>(isApiReady && api.query.allychainInfo?.allychainId);
  const [state, setState] = useState<Teleport>(() => ({ ...DEFAULT_STATE }));

  useEffect((): void => {
    if (isApiReady) {
      const relayGenesis = api.genesisHash.toHex();
      const endpoint = endpoints.find(({ genesisHash }) => genesisHash === relayGenesis);

      if (endpoint) {
        const destinations = extractRelayDestinations(relayGenesis, ({ allyId }) =>
          isNumber(allyId) &&
          endpoint.teleport.includes(allyId)
        );
        const oneWay = extractRelayDestinations(relayGenesis, ({ allyId, teleport }) =>
          isNumber(allyId) &&
          !teleport.includes(-1)
        ).map(({ allyId }) => allyId || -1);

        setState({
          allowTeleport: destinations.length !== 0,
          destinations,
          isRelayTeleport: true,
          oneWay
        });
      }
    }
  }, [api, isApiReady]);

  useEffect((): void => {
    if (allyId) {
      const endpoint = endpoints.find(({ value }) => value === apiUrl);

      if (endpoint && endpoint.genesisHashRelay) {
        const destinations = extractRelayDestinations(endpoint.genesisHashRelay, ({ allyId }) =>
          endpoint.teleport.includes(isNumber(allyId) ? allyId : -1)
        );
        const oneWay = extractRelayDestinations(endpoint.genesisHashRelay, ({ allyId, teleport }) =>
          !teleport.includes(isNumber(allyId) ? allyId : -1)
        ).map(({ allyId }) => allyId || -1);

        setState({
          allowTeleport: destinations.length !== 0,
          destinations,
          isParaTeleport: true,
          oneWay
        });
      }
    }
  }, [apiUrl, allyId]);

  return state;
}
