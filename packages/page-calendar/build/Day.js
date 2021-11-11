// Copyright 2017-2021 @axia-js/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { Button } from '@axia-js/react-components';
import { MONTHS } from "./constants.js";
import DayHour from "./DayHour.js";
import DayTime from "./DayTime.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const HOURS = (() => {
  const hours = [];

  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }

  return hours;
})();

function Day({
  className,
  date,
  hasNextDay,
  now,
  scheduled,
  setNextDay,
  setPrevDay,
  setView
}) {
  const {
    t
  } = useTranslation();
  const monthRef = useRef(MONTHS.map(m => t(m)));
  const [isToday, nowHours, nowMinutes] = useMemo(() => [date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear() && date.getDate() === now.getDate(), now.getHours(), now.getMinutes()], [date, now]);

  const _setView = useCallback(() => setView(true), [setView]);

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsxs("h1", {
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(Button, {
          className: "all-events-button",
          icon: 'list',
          onClick: _setView
        }), date.getDate(), " ", monthRef.current[date.getMonth()], " ", date.getFullYear(), " ", isToday && /*#__PURE__*/_jsx(DayTime, {})]
      }), /*#__PURE__*/_jsxs(Button.Group, {
        children: [/*#__PURE__*/_jsx(Button, {
          icon: "chevron-left",
          isDisabled: isToday,
          onClick: setPrevDay
        }), /*#__PURE__*/_jsx(Button, {
          icon: "chevron-right",
          isDisabled: !hasNextDay,
          onClick: setNextDay
        })]
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "hoursContainer highlight--bg-faint",
      children: HOURS.map((hour, index) => /*#__PURE__*/_jsx(DayHour, {
        date: date,
        hour: hour,
        index: index,
        minutes: isToday && nowHours === index ? nowMinutes : 0,
        scheduled: scheduled
      }, hour))
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Day).withConfig({
  displayName: "Day",
  componentId: "sc-wvc8ri-0"
})(["flex:1;.dayHeader{align-items:center;display:flex;font-size:1.25rem;justify-content:space-between;padding:1rem 1.5rem 0;}.hoursContainer{z-index:1;}"]));