// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Columar } from '@axia-js/react-components';
import BlockHeaders from "./BlockHeaders.js";
import Events from "./Events.js";
import Query from "./Query.js";
import Summary from "./Summary.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Main({
  eventCount,
  events,
  headers
}) {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Query, {}), /*#__PURE__*/_jsx(Summary, {
      eventCount: eventCount
    }), /*#__PURE__*/_jsxs(Columar, {
      children: [/*#__PURE__*/_jsx(Columar.Column, {
        children: /*#__PURE__*/_jsx(BlockHeaders, {
          headers: headers
        })
      }), /*#__PURE__*/_jsx(Columar.Column, {
        children: /*#__PURE__*/_jsx(Events, {
          events: events
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Main);