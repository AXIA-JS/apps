"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Events = exports.EventsContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_EVENTS = {
  eventCount: 0,
  events: []
};
const MAX_EVENTS = 75;

const EventsContext = /*#__PURE__*/_react.default.createContext(DEFAULT_EVENTS);

exports.EventsContext = EventsContext;

async function manageEvents(api, prev, records, setState) {
  const newEvents = records.map((record, index) => ({
    indexes: [index],
    record
  })).filter(({
    record: {
      event: {
        method,
        section
      }
    }
  }) => section !== 'system' && (!['balances', 'treasury'].includes(section) || !['Deposit'].includes(method)) && (!['parasInclusion', 'inclusion'].includes(section) || !['CandidateBacked', 'CandidateIncluded'].includes(method))).reduce((combined, e) => {
    const prev = combined.find(({
      record: {
        event: {
          method,
          section
        }
      }
    }) => e.record.event.section === section && e.record.event.method === method);

    if (prev) {
      prev.indexes.push(...e.indexes);
    } else {
      combined.push(e);
    }

    return combined;
  }, []).reverse();
  const newEventHash = (0, _utilCrypto.xxhashAsHex)((0, _util.stringToU8a)((0, _util.stringify)(newEvents)));

  if (newEventHash !== prev.event && newEvents.length) {
    prev.event = newEventHash; // retrieve the last header, this will map to the current state

    const header = await api.rpc.chain.getHeader(records.createdAtHash);
    const blockNumber = header.number.unwrap();
    const blockHash = header.hash.toHex();

    if (blockHash !== prev.block) {
      prev.block = blockHash;
      setState(({
        events
      }) => ({
        eventCount: records.length,
        events: [...newEvents.map(({
          indexes,
          record
        }) => ({
          blockHash,
          blockNumber,
          indexes,
          key: `${blockNumber.toNumber()}-${blockHash}-${indexes.join('.')}`,
          record
        })), // remove all events for the previous same-height blockNumber
        ...events.filter(p => {
          var _p$blockNumber;

          return !((_p$blockNumber = p.blockNumber) !== null && _p$blockNumber !== void 0 && _p$blockNumber.eq(blockNumber));
        })].slice(0, MAX_EVENTS)
      }));
    }
  } else {
    setState(({
      events
    }) => ({
      eventCount: records.length,
      events
    }));
  }
}

function EventsBase({
  children
}) {
  const {
    api,
    isApiReady
  } = (0, _reactHooks.useApi)();
  const [state, setState] = (0, _react.useState)(DEFAULT_EVENTS);
  const records = (0, _reactHooks.useCall)(isApiReady && api.query.system.events);
  const prevHashes = (0, _react.useRef)({
    block: null,
    event: null
  });
  (0, _react.useEffect)(() => {
    records && manageEvents(api, prevHashes.current, records, setState).catch(console.error);
  }, [api, prevHashes, records, setState]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(EventsContext.Provider, {
    value: state,
    children: children
  });
}

const Events = /*#__PURE__*/_react.default.memo(EventsBase);

exports.Events = Events;