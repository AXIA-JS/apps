// Copyright 2017-2021 @axia-js/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Button } from '@axia-js/react-components';
import DayItem from "./DayItem.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function UpcomingEvents({
  className,
  scheduled,
  setView
}) {
  const sched = useMemo(() => scheduled.sort((a, b) => a.dateTime - b.dateTime), [scheduled]);

  const _setView = useCallback(() => setView(false), [setView]);

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx("h1", {
      children: /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(Button, {
          className: "all-events-button",
          icon: "calendar",
          onClick: _setView
        }), "Upcoming Events"]
      })
    }), /*#__PURE__*/_jsx("ul", {
      className: "allEventsWrapper",
      children: sched.map((item, index) => {
        return /*#__PURE__*/_jsx(DayItem, {
          className: "all-events-rows",
          item: item,
          showAllEvents: true
        }, index);
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(UpcomingEvents).withConfig({
  displayName: "UpcomingEvents",
  componentId: "sc-4kdl7a-0"
})(["flex:0;max-width:max-content;.all-events-rows{padding:10px 0;font-size:13px;&:nth-child(odd){background:var(--bg-table);}}.allEventsWrapper{padding-inline-start:10px;}"]));