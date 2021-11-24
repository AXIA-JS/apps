// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Table } from '@axia-js/react-components';
import { formatNumber } from '@axia-js/util';
import Event from "./Event.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Events({
  className = '',
  emptyLabel,
  eventClassName,
  events,
  label
}) {
  const {
    t
  } = useTranslation();
  const header = useMemo(() => [[label || t('recent events'), 'start']], [label, t]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: emptyLabel || t('No events available'),
    header: header,
    children: events && events.map(({
      blockHash,
      blockNumber,
      indexes,
      key,
      record
    }) => /*#__PURE__*/_jsx("tr", {
      className: eventClassName,
      children: /*#__PURE__*/_jsxs("td", {
        className: "overflow",
        children: [/*#__PURE__*/_jsx(Event, {
          value: record
        }), blockNumber && /*#__PURE__*/_jsxs("div", {
          className: "event-link",
          children: [indexes.length !== 1 && /*#__PURE__*/_jsxs("span", {
            children: ["(", formatNumber(indexes.length), "x)\xA0"]
          }), /*#__PURE__*/_jsxs(Link, {
            to: `/explorer/query/${blockHash || ''}`,
            children: [formatNumber(blockNumber), "-", indexes[0]]
          })]
        })]
      })
    }, key))
  });
}

export default /*#__PURE__*/React.memo(styled(Events).withConfig({
  displayName: "Events",
  componentId: "sc-1kdronr-0"
})(["td.overflow{position:relative;.event-link{position:absolute;right:0.75rem;top:0.5rem;}}"]));