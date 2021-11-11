// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useApi } from "./useApi.js";
import { useCall } from "./useCall.js";
import { useIsMountedRef } from "./useIsMountedRef.js";
const EMPTY_RESULT = {
  blockHash: '',
  events: []
};

const IDENTITY_FILTER = () => true;

export function useEventTrigger(_checks, filter = IDENTITY_FILTER) {
  const {
    api
  } = useApi();
  const [state, setState] = useState(() => EMPTY_RESULT);
  const [checks] = useState(() => _checks);
  const mountedRef = useIsMountedRef();
  const eventRecords = useCall(api.query.system.events);
  useEffect(() => {
    if (mountedRef.current && eventRecords) {
      const events = eventRecords.filter(r => r.event && checks.some(c => c && c.is(r.event)) && filter(r));

      if (events.length) {
        var _eventRecords$created;

        setState({
          blockHash: ((_eventRecords$created = eventRecords.createdAtHash) === null || _eventRecords$created === void 0 ? void 0 : _eventRecords$created.toHex()) || '',
          events
        });
      }
    }
  }, [eventRecords, checks, filter, mountedRef]);
  return state;
}