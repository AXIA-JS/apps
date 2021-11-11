import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Table } from '@axia-js/react-components';
import { useApi, useBestNumber, useCall, useCallMulti, useIsParasLinked } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import useHrmp from "../useHrmp.js";
import Parachain from "./Parachain.js";
import { jsx as _jsx } from "react/jsx-runtime";
const EMPTY_EVENTS = {
  lastBacked: {},
  lastIncluded: {},
  lastTimeout: {}
};
const optionsMulti = {
  defaultValue: [null, null, null, null]
};

function includeEntry(map, event, blockHash, blockNumber) {
  const {
    descriptor
  } = event.data[0];

  if (descriptor) {
    map[descriptor.paraId.toString()] = {
      blockHash,
      blockNumber,
      relayParent: descriptor.relayParent.toHex()
    };
  }
}

function extractScheduledIds(scheduled = []) {
  return scheduled.reduce((all, {
    scheduledIds
  }) => scheduledIds.reduce((all, id) => _objectSpread(_objectSpread({}, all), {}, {
    [id.toString()]: true
  }), all), {});
}

function mapValidators(startWith, ids, validators, validatorGroups, activeIndices, assignments) {
  return assignments && activeIndices && validators && validatorGroups && ids ? ids.reduce((all, id) => {
    const assignment = assignments.find(({
      paraId
    }) => paraId.eq(id));

    if (!assignment) {
      return all;
    }

    return _objectSpread(_objectSpread({}, all), {}, {
      [id.toString()]: [assignment.groupIdx, validatorGroups[assignment.groupIdx.toNumber()].map(indexActive => [indexActive, activeIndices[indexActive.toNumber()]]).filter(([, a]) => a).map(([indexActive, indexValidator]) => ({
        indexActive,
        indexValidator,
        validatorId: validators[indexValidator.toNumber()]
      }))]
    });
  }, _objectSpread({}, startWith)) : startWith;
}

function extractEvents(api, lastBlock, prev) {
  const backed = {};
  const included = {};
  const timeout = {};
  const blockNumber = lastBlock.block.header.number.unwrap();
  const blockHash = lastBlock.block.header.hash.toHex();
  let wasBacked = false;
  let wasIncluded = false;
  let wasTimeout = false;
  lastBlock.events.forEach(({
    event,
    phase
  }) => {
    if (phase.isApplyExtrinsic) {
      var _ref, _ref2, _ref3;

      if ((_ref = api.events.paraInclusion || api.events.parasInclusion || api.events.inclusion) !== null && _ref !== void 0 && _ref.CandidateBacked.is(event)) {
        includeEntry(backed, event, blockHash, blockNumber);
        wasBacked = true;
      } else if ((_ref2 = api.events.paraInclusion || api.events.parasInclusion || api.events.inclusion) !== null && _ref2 !== void 0 && _ref2.CandidateIncluded.is(event)) {
        includeEntry(included, event, blockHash, blockNumber);
        wasIncluded = true;
      } else if ((_ref3 = api.events.paraInclusion || api.events.parasInclusion || api.events.inclusion) !== null && _ref3 !== void 0 && _ref3.CandidateTimedOut.is(event)) {
        includeEntry(timeout, event, blockHash, blockNumber);
        wasTimeout = true;
      }
    }
  });
  return wasBacked || wasIncluded || wasTimeout ? {
    lastBacked: wasBacked ? _objectSpread(_objectSpread({}, prev.lastBacked), backed) : prev.lastBacked,
    lastIncluded: wasIncluded ? _objectSpread(_objectSpread({}, prev.lastIncluded), included) : prev.lastIncluded,
    lastTimeout: wasTimeout ? _objectSpread(_objectSpread({}, prev.lastTimeout), timeout) : prev.lastTimeout
  } : prev;
}

function extractActions(actionsQueue, knownIds) {
  return actionsQueue && knownIds ? knownIds.reduce((all, [id, key]) => _objectSpread(_objectSpread({}, all), {}, {
    [key]: actionsQueue.find(({
      paraIds
    }) => paraIds.some(p => p.eq(id)))
  }), {}) : {};
}

function extractIds(hasLinksMap, ids) {
  return ids === null || ids === void 0 ? void 0 : ids.map(id => [id, id.toString()]).sort(([aId, aIds], [bId, bIds]) => {
    const aKnown = hasLinksMap[aIds] || false;
    const bKnown = hasLinksMap[bIds] || false;
    return aKnown === bKnown ? aId.cmp(bId) : aKnown ? -1 : 1;
  });
}

function Parachains({
  actionsQueue,
  ids,
  leasePeriod,
  scheduled
}) {
  var _ref4, _ref5, _ref6;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const bestNumber = useBestNumber();
  const lastBlock = useCall(api.derive.chain.subscribeNewBlocks);
  const [{
    lastBacked,
    lastIncluded,
    lastTimeout
  }, setLastEvents] = useState(EMPTY_EVENTS);
  const [validators, assignments, validatorGroups, validatorIndices] = useCallMulti([api.query.session.validators, (_ref4 = api.query.parasScheduler || api.query.paraScheduler || api.query.scheduler) === null || _ref4 === void 0 ? void 0 : _ref4.scheduled, (_ref5 = api.query.parasScheduler || api.query.paraScheduler || api.query.scheduler) === null || _ref5 === void 0 ? void 0 : _ref5.validatorGroups, (_ref6 = api.query.parasShared || api.query.paraShared || api.query.shared) === null || _ref6 === void 0 ? void 0 : _ref6.activeValidatorIndices], optionsMulti);
  const hrmp = useHrmp();
  const hasLinksMap = useIsParasLinked(ids);
  const [validatorMap, setValidatorMap] = useState({});
  const headerRef = useRef([[t('parachains'), 'start', 2], ['', 'media--1400'], [t('head'), 'start media--1500'], [t('lifecycle'), 'start'], [], [t('included'), undefined, 2], [t('backed'), 'no-pad-left media--800'], [t('timeout'), 'no-pad-left media--900'], [t('chain'), 'no-pad-left'], [t('in/out (msg)'), 'media--1200', 2], [t('leases'), 'media--1000']]);
  const scheduledIds = useMemo(() => extractScheduledIds(scheduled), [scheduled]);
  const knownIds = useMemo(() => extractIds(hasLinksMap, ids), [ids, hasLinksMap]);
  const nextActions = useMemo(() => extractActions(actionsQueue, knownIds), [actionsQueue, knownIds]);
  useEffect(() => {
    lastBlock && setLastEvents(prev => extractEvents(api, lastBlock, prev));
  }, [api, lastBlock]);
  useEffect(() => {
    setValidatorMap(prev => mapValidators(prev, ids, validators, validatorGroups, validatorIndices, assignments));
  }, [assignments, ids, validators, validatorGroups, validatorIndices]);
  return /*#__PURE__*/_jsx(Table, {
    empty: knownIds && t('There are no registered parachains'),
    header: headerRef.current,
    children: knownIds === null || knownIds === void 0 ? void 0 : knownIds.map(([id, key]) => /*#__PURE__*/_jsx(Parachain, {
      bestNumber: bestNumber,
      channelDst: hrmp === null || hrmp === void 0 ? void 0 : hrmp.dst[id.toString()],
      channelSrc: hrmp === null || hrmp === void 0 ? void 0 : hrmp.src[id.toString()],
      id: id,
      isScheduled: scheduledIds[key],
      lastBacked: lastBacked[key],
      lastInclusion: lastIncluded[key],
      lastTimeout: lastTimeout[key],
      leasePeriod: leasePeriod,
      nextAction: nextActions[key],
      sessionValidators: validators,
      validators: validatorMap[key]
    }, key))
  });
}

export default /*#__PURE__*/React.memo(Parachains);