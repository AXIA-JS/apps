import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useMemo, useState } from 'react';
import { u8aConcat, u8aToHex } from '@axia-js/util';
import { useAccounts } from "./useAccounts.js";
import { useApi } from "./useApi.js";
import { useIsMountedRef } from "./useIsMountedRef.js";
import { useOwnStashes } from "./useOwnStashes.js";

function toIdString(id) {
  return id ? id.toString() : null;
}

function getStakerState(stashId, allAccounts, [isOwnStash, {
  controllerId: _controllerId,
  exposure,
  nextSessionIds: _nextSessionIds,
  nominators,
  rewardDestination,
  sessionIds: _sessionIds,
  stakingLedger,
  validatorPrefs
}, validateInfo]) {
  const isStashNominating = !!(nominators !== null && nominators !== void 0 && nominators.length);
  const isStashValidating = !(Array.isArray(validateInfo) ? validateInfo[1].isEmpty : validateInfo.isEmpty);
  const nextSessionIds = _nextSessionIds instanceof Map ? [..._nextSessionIds.values()] : _nextSessionIds;
  const nextConcat = u8aConcat(...nextSessionIds.map(id => id.toU8a()));
  const sessionIds = _sessionIds instanceof Map ? [..._sessionIds.values()] : _sessionIds;
  const currConcat = u8aConcat(...sessionIds.map(id => id.toU8a()));
  const controllerId = toIdString(_controllerId);
  return {
    controllerId,
    destination: rewardDestination,
    exposure,
    hexSessionIdNext: u8aToHex(nextConcat, 48),
    hexSessionIdQueue: u8aToHex(currConcat.length ? currConcat : nextConcat, 48),
    isLoading: false,
    isOwnController: allAccounts.includes(controllerId || ''),
    isOwnStash,
    isStashNominating,
    isStashValidating,
    // we assume that all ids are non-null
    nominating: nominators === null || nominators === void 0 ? void 0 : nominators.map(toIdString),
    sessionIds: (nextSessionIds.length ? nextSessionIds : sessionIds).map(toIdString),
    stakingLedger,
    stashId,
    validatorPrefs
  };
}

export function useOwnStashInfos() {
  const {
    api
  } = useApi();
  const {
    allAccounts
  } = useAccounts();
  const mountedRef = useIsMountedRef();
  const ownStashes = useOwnStashes();
  const [queried, setQueried] = useState();
  useEffect(() => {
    let unsub;

    if (ownStashes) {
      if (ownStashes.length) {
        const stashIds = ownStashes.map(([stashId]) => stashId);
        const fns = [[api.derive.staking.accounts, stashIds], [api.query.staking.validators.multi, stashIds]];
        api.combineLatest(fns, ([accounts, validators]) => {
          mountedRef.current && ownStashes.length === accounts.length && ownStashes.length === validators.length && setQueried(ownStashes.reduce((queried, [stashId, isOwnStash], index) => _objectSpread(_objectSpread({}, queried), {}, {
            [stashId]: [isOwnStash, accounts[index], validators[index]]
          }), {}));
        }).then(u => {
          unsub = u;
        }).catch(console.error);
      } else {
        mountedRef.current && setQueried({});
      }
    }

    return () => {
      unsub && unsub();
    };
  }, [api, mountedRef, ownStashes]);
  return useMemo(() => ownStashes && queried && ownStashes.length === Object.keys(queried).length ? ownStashes.filter(([stashId]) => queried[stashId]).map(([stashId]) => getStakerState(stashId, allAccounts, queried[stashId])) : undefined, [allAccounts, ownStashes, queried]);
}