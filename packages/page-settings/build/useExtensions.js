import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useMemo, useState } from 'react';
import store from 'store';
import { useApi } from '@axia-js/react-hooks';
let triggerCount = 0;
const triggers = new Map();

function triggerAll() {
  [...triggers.values()].forEach(trigger => trigger(Date.now()));
} // save the properties for a specific extension


function saveProperties(api, {
  name,
  version
}) {
  const storeKey = `properties:${api.genesisHash.toHex()}`;
  const allProperties = store.get(storeKey, {});
  allProperties[name] = {
    extensionVersion: version,
    ss58Format: api.registry.chainSS58,
    tokenDecimals: api.registry.chainDecimals[0],
    tokenSymbol: api.registry.chainTokens[0]
  };
  store.set(storeKey, allProperties);
} // determines if the extension has current properties


function hasCurrentProperties(api, {
  extension
}) {
  const allProperties = store.get(`properties:${api.genesisHash.toHex()}`, {}); // when we don't have properties yet, assume nothing has changed and store

  if (!allProperties[extension.name]) {
    saveProperties(api, extension);
    return true;
  }

  const {
    ss58Format,
    tokenDecimals,
    tokenSymbol
  } = allProperties[extension.name];
  return ss58Format === api.registry.chainSS58 && tokenDecimals === api.registry.chainDecimals[0] && tokenSymbol === api.registry.chainTokens[0];
} // filter extensions based on the properties we have available


function filterAll(api, all) {
  const extensions = all.map(info => {
    const current = info.known.find(({
      genesisHash
    }) => api.genesisHash.eq(genesisHash)) || null; // if we cannot find it as known, or either the specVersion or properties mismatches, mark it as upgradable

    return !current || api.runtimeVersion.specVersion.gtn(current.specVersion) || !hasCurrentProperties(api, info) ? _objectSpread(_objectSpread({}, info), {}, {
      current
    }) : null;
  }).filter(info => !!info);
  return {
    count: extensions.length,
    extensions
  };
}

async function getExtensionInfo(api, extension) {
  if (!extension.metadata) {
    return null;
  }

  try {
    const metadata = extension.metadata;
    const known = await metadata.get();
    return {
      extension,
      known,
      update: async def => {
        let isOk = false;

        try {
          isOk = await metadata.provide(def);

          if (isOk) {
            saveProperties(api, extension);
            triggerAll();
          }
        } catch (error) {// ignore
        }

        return isOk;
      }
    };
  } catch (error) {
    return null;
  }
} // eslint-disable-next-line @typescript-eslint/no-unused-vars


async function getKnown(api, extensions, _) {
  const all = await Promise.all(extensions.map(extension => getExtensionInfo(api, extension)));
  return all.filter(info => !!info);
}

const EMPTY_STATE = {
  count: 0,
  extensions: []
};
export default function useExtensions() {
  const {
    api,
    extensions,
    isApiReady,
    isDevelopment
  } = useApi();
  const [all, setAll] = useState();
  const [trigger, setTrigger] = useState(0);
  useEffect(() => {
    const myId = `${++triggerCount}-${Date.now()}`;
    triggers.set(myId, setTrigger);
    return () => {
      triggers.delete(myId);
    };
  }, []);
  useEffect(() => {
    extensions && getKnown(api, extensions, trigger).then(setAll);
  }, [api, extensions, trigger]);
  return useMemo(() => isDevelopment || !isApiReady || !all ? EMPTY_STATE : filterAll(api, all), [all, api, isApiReady, isDevelopment]);
}