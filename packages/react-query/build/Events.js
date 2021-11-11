// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef, useState } from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';
import { stringify, stringToU8a } from '@axia-js/util';
import { xxhashAsHex } from '@axia-js/util-crypto';
import { jsx as _jsx } from "react/jsx-runtime";
const DEFAULT_EVENTS = {
  eventCount: 0,
  events: []
};
const MAX_EVENTS = 75;
const EventsContext = /*#__PURE__*/React.createContext(DEFAULT_EVENTS);

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
  const newEventHash = xxhashAsHex(stringToU8a(stringify(newEvents)));

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
  } = useApi();
  const [state, setState] = useState(DEFAULT_EVENTS);
  const records = useCall(isApiReady && api.query.system.events);
  const prevHashes = useRef({
    block: null,
    event: null
  });
  useEffect(() => {
    records && manageEvents(api, prevHashes.current, records, setState).catch(console.error);
  }, [api, prevHashes, records, setState]);
  return /*#__PURE__*/_jsx(EventsContext.Provider, {
    value: state,
    children: children
  });
}

const Events = /*#__PURE__*/React.memo(EventsBase);
export { EventsContext, Events };