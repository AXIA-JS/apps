"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useInactives;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function extractState(api, stashId, slashes, nominees, _ref, submittedIn, exposures) {
  var _api$consts$staking;

  let {
    activeEra
  } = _ref;
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

  const nomsOver = exposures.map(_ref2 => {
    let {
      others
    } = _ref2;
    return others.sort((a, b) => {
      var _b$value, _a$value;

      return (((_b$value = b.value) === null || _b$value === void 0 ? void 0 : _b$value.unwrap()) || _util.BN_ZERO).cmp(((_a$value = a.value) === null || _a$value === void 0 ? void 0 : _a$value.unwrap()) || _util.BN_ZERO);
    });
  }).map((others, index) => !max || max.gtn(others.map(_ref3 => {
    let {
      who
    } = _ref3;
    return who.toString();
  }).indexOf(stashId)) ? null : nominees[index]).filter(nominee => !!nominee && !nomsChilled.includes(nominee)); // first a blanket find of nominations not in the active set

  let nomsInactive = exposures.map((exposure, index) => exposure.others.some(_ref4 => {
    let {
      who
    } = _ref4;
    return who.eq(stashId);
  }) ? null : nominees[index]).filter(nominee => !!nominee); // waiting if validator is inactive or we have not submitted long enough ago

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

function useInactives(stashId, nominees) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const mountedRef = (0, _reactHooks.useIsMountedRef)();
  const [state, setState] = (0, _react.useState)({});
  const indexes = (0, _reactHooks.useCall)(api.derive.session.indexes);
  (0, _react.useEffect)(() => {
    let unsub;

    if (mountedRef.current && nominees && nominees.length && indexes) {
      api.queryMulti([[api.query.staking.nominators, stashId]].concat(api.query.staking.erasStakers ? nominees.map(id => [api.query.staking.erasStakers, [indexes.activeEra, id]]) : nominees.map(id => [api.query.staking.stakers, id])).concat(nominees.map(id => [api.query.staking.slashingSpans, id])), _ref5 => {
        let [optNominators, ...exposuresAndSpans] = _ref5;
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