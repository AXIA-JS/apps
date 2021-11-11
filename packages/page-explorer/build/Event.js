// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Event as EventDisplay, Expander } from '@axia-js/react-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Event({
  className = '',
  value: {
    event
  }
}) {
  return /*#__PURE__*/_jsx(Expander, {
    className: className,
    summary: `${event.section}.${event.method}`,
    summaryMeta: event.meta,
    children: /*#__PURE__*/_jsx(EventDisplay, {
      className: "details",
      value: event
    })
  });
}

export default /*#__PURE__*/React.memo(Event);