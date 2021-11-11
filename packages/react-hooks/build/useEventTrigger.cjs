"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEventTrigger = useEventTrigger;

var _react = require("react");

var _useApi = require("./useApi.cjs");

var _useCall = require("./useCall.cjs");

var _useIsMountedRef = require("./useIsMountedRef.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
const EMPTY_RESULT = {
  blockHash: '',
  events: []
};

const IDENTITY_FILTER = () => true;

function useEventTrigger(_checks, filter = IDENTITY_FILTER) {
  const {
    api
  } = (0, _useApi.useApi)();
  const [state, setState] = (0, _react.useState)(() => EMPTY_RESULT);
  const [checks] = (0, _react.useState)(() => _checks);
  const mountedRef = (0, _useIsMountedRef.useIsMountedRef)();
  const eventRecords = (0, _useCall.useCall)(api.query.system.events);
  (0, _react.useEffect)(() => {
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