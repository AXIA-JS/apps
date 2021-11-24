import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { useAccounts, useApi, useCall, useEventTrigger, useMapEntries } from '@axia-js/react-hooks';

function extractIds(entries) {
  const owned = entries.map(([{
    args: [paraId]
  }, optInfo]) => {
    if (optInfo.isNone) {
      return null;
    }

    const paraInfo = optInfo.unwrap();
    return {
      manager: paraInfo.manager.toString(),
      paraId,
      paraInfo
    };
  }).filter(id => !!id);
  return {
    ids: owned.map(({
      paraId
    }) => paraId),
    owned
  };
}

const hashesOption = {
  transform: ([[paraIds], optHashes]) => paraIds.map((paraId, index) => ({
    hash: optHashes[index].unwrapOr(null),
    paraId
  })),
  withParamsTransform: true
};
export default function useOwnedIds() {
  const {
    api
  } = useApi();
  const {
    allAccounts
  } = useAccounts();
  const trigger = useEventTrigger([api.events.registrar.Registered, api.events.registrar.Reserved]);
  const unfiltered = useMapEntries(api.query.registrar.paras, {
    at: trigger.blockHash,
    transform: extractIds
  });
  const hashes = useCall(api.query.paras.currentCodeHash.multi, [unfiltered ? unfiltered.ids : []], hashesOption);
  return useMemo(() => unfiltered && hashes ? unfiltered.owned.filter(id => allAccounts.some(a => a === id.manager)).map(data => _objectSpread(_objectSpread({}, data), {}, {
    hasCode: hashes.some(({
      hash,
      paraId
    }) => !!hash && paraId.eq(data.paraId))
  })) : [], [allAccounts, hashes, unfiltered]);
}