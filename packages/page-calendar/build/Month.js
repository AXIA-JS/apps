// Copyright 2017-2021 @axia-js/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';
import { Button } from '@axia-js/react-components';
import { DAYS, MONTHS } from "./constants.js";
import MonthDay from "./MonthDay.js";
import { useTranslation } from "./translate.js";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

function Month({
  className,
  hasNextMonth,
  lastDay,
  now,
  scheduled,
  setDay,
  setNextMonth,
  setPrevMonth,
  state: {
    dateMonth,
    dateSelected,
    days,
    startClass
  }
}) {
  const {
    t
  } = useTranslation();
  const dayOfWeekRef = useRef(DAYS.map(d => t(d)));
  const monthRef = useRef(MONTHS.map(m => t(m)));
  const [isCurrYear, isCurrMonth, isNowYear, isNowMonth, isOlderMonth] = useMemo(() => [dateMonth.getFullYear() === dateSelected.getFullYear(), dateMonth.getMonth() === dateSelected.getMonth(), now.getFullYear() === dateMonth.getFullYear(), now.getMonth() === dateMonth.getMonth(), now.getMonth() > dateMonth.getMonth()], [dateMonth, dateSelected, now]);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsxs("h1", {
      children: [/*#__PURE__*/_jsxs("div", {
        children: [monthRef.current[dateMonth.getMonth()], " ", dateMonth.getFullYear()]
      }), /*#__PURE__*/_jsxs(Button.Group, {
        children: [/*#__PURE__*/_jsx(Button, {
          icon: "chevron-left",
          isDisabled: isNowYear && (isOlderMonth || isNowMonth),
          onClick: setPrevMonth
        }), /*#__PURE__*/_jsx(Button, {
          icon: "chevron-right",
          isDisabled: !hasNextMonth,
          onClick: setNextMonth
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: `calendar ${startClass}`,
      children: [/*#__PURE__*/_jsx("div", {
        className: "dayOfWeek",
        children: dayOfWeekRef.current.map(day => /*#__PURE__*/_jsx("div", {
          children: t(day)
        }, day))
      }), /*#__PURE__*/_jsx("div", {
        className: "dateGrid",
        children: days.map(day => /*#__PURE__*/_jsx(MonthDay, {
          dateMonth: dateMonth,
          day: day,
          isCurrent: isCurrYear && isCurrMonth && day === dateSelected.getDate(),
          isDisabled: isNowYear && (isOlderMonth || isNowMonth && now.getDate() > day) || !hasNextMonth && day > lastDay,
          scheduled: scheduled,
          setDay: setDay
        }, day))
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Month).withConfig({
  displayName: "Month",
  componentId: "sc-vyq43a-0"
})(["flex:0;max-width:max-content;.calendar{padding:1rem 1.5rem;.dateGrid,.dayOfWeek{display:grid;grid-template-columns:repeat(7,1fr);}.dateGrid{margin-top:0.5em;}&.startSun .dateGrid .day:first-child{grid-column:1}&.startMon .dateGrid .day:first-child{grid-column:2}&.startTue .dateGrid .day:first-child{grid-column:3}&.startWed .dateGrid .day:first-child{grid-column:4}&.startThu .dateGrid .day:first-child{grid-column:5}&.startFri .dateGrid .day:first-child{grid-column:6}&.startSat .dateGrid .day:first-child{grid-column:7}.dayOfWeek{> *{font-size:0.7em;font-weight:var(--font-weight-normal);letter-spacing:0.1em;text-align:center;text-transform:uppercase;}}.monthIndicator{align-items:center;display:flex;font-size:1.25rem;justify-content:space-between;}}"]));