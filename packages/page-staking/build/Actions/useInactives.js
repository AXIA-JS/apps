// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useApi, useCall, useIsMountedRef } from '@axia-js/react-hooks';
import { BN_ZERO } from '@axia-js/util';

function extractState(api, stashId, slashes, nominees, {
  activeEra
}, submittedIn, exposures) {
  var _api$consts$staking;

  const max = (_api$consts$staking = api.consts.staking) === null || _api$consts$staking === void 0 ? void 0 : _api$consts$staking.maxNominatorRewardedPerValidator; // chilled

  const nomsChilled = nominees.filter((_, index) => {
    if (slashes[index].isNone) {
      return false;
    }

    const {
      lastNonzeroSlash
    } = slashes[index].unwrap();
    return !lastNonzeroSlash.isZero() && lastNonzeroSlash.gte(submittedIn);
  }); // all nominations that are oversubscribed

  const nomsOver = exposures.map(({
    others
  }) => others.sort((a, b) => {
    var _b$value, _a$value;

    return (((_b$value = b.value) === null || _b$value === void 0 ? void 0 : _b$value.unwrap()) || BN_ZERO).cmp(((_a$value = a.value) === null || _a$value === void 0 ? void 0 : _a$value.unwrap()) || BN_ZERO);
  })).map((others, index) => !max || max.gtn(others.map(({
    who
  }) => who.toString()).indexOf(stashId)) ? null : nominees[index]).filter(nominee => !!nominee && !nomsChilled.includes(nominee)); // first a blanket find of nominations not in the active set

  let nomsInactive = exposures.map((exposure, index) => exposure.others.some(({
    who
  }) => who.eq(stashId)) ? null : nominees[index]).filter(nominee => !!nominee); // waiting if validator is inactive or we have not submitted long enough ago

  const nomsWaiting = exposures.map((exposure, index) => {
    var _exposure$total;

    return (_exposure$total = exposure.total) !== null && _exposure$total !== void 0 && _exposure$total.unwrap().isZero() || nomsInactive.includes(nominees[index]) && // it could be activeEra + 1 (currentEra for last session)
    submittedIn.gte(activeEra) ? nominees[index] : null;
  }).filter(nominee => !!nominee).filter(nominee => !nomsChilled.includes(nominee) && !nomsOver.includes(nominee)); // filter based on all inactives

  const nomsActive = nominees.filter(nominee => !nomsInactive.includes(nominee) && !nomsChilled.includes(nominee) && !nomsOver.includes(nominee)); // inactive also contains waiting, remove those

  nomsInactive = nomsInactive.filter(nominee => !nomsWaiting.includes(nominee) && !nomsChilled.includes(nominee) && !nomsOver.includes(nominee));
  return {
    nomsActive,
    nomsChilled,
    nomsInactive,
    nomsOver,
    nomsWaiting
  };
}

export default function useInactives(stashId, nominees) {
  const {
    api
  } = useApi();
  const mountedRef = useIsMountedRef();
  const [state, setState] = useState({});
  const indexes = useCall(api.derive.session.indexes);
  useEffect(() => {
    let unsub;

    if (mountedRef.current && nominees && nominees.length && indexes) {
      api.queryMulti([[api.query.staking.nominators, stashId]].concat(api.query.staking.erasStakers ? nominees.map(id => [api.query.staking.erasStakers, [indexes.activeEra, id]]) : nominees.map(id => [api.query.staking.stakers, id])).concat(nominees.map(id => [api.query.staking.slashingSpans, id])), ([optNominators, ...exposuresAndSpans]) => {
        const exposures = exposuresAndSpans.slice(0, nominees.length);
        const slashes = exposuresAndSpans.slice(nominees.length);
        mountedRef.current && setState(extractState(api, stashId, slashes, nominees, indexes, optNominators.unwrapOrDefault().submittedIn, exposures));
      }).then(_unsub => {
        unsub = _unsub;
      }).catch(console.error);
    }

    return () => {
      unsub && unsub();
    };
  }, [api, indexes, mountedRef, nominees, stashId]);
  return state;
}