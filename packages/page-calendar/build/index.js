// Copyright 2017-2021 @axia-js/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Tabs } from '@axia-js/react-components';
import Day from "./Day.js";
import Month from "./Month.js";
import { useTranslation } from "./translate.js";
import UpcomingEvents from "./UpcomingEvents.js";
import useScheduled from "./useScheduled.js";
import { getDateState, nextMonth, prevMonth } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const NOW_INC = 30 * 1000;

function CalendarApp({
  basePath,
  className
}) {
  const {
    t
  } = useTranslation();
  const scheduled = useScheduled();
  const [now, setNow] = useState(() => new Date());
  const [dateState, setDateState] = useState(() => getDateState(now, now));
  const [allEventsView, setAllEventsView] = useState(false);
  const itemsRef = useRef([{
    isRoot: true,
    name: 'view',
    text: t('Upcoming events')
  }]);
  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), NOW_INC);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const [hasNextMonth, hasNextDay, lastDay] = useMemo(() => {
    const nextDay = new Date(dateState.dateSelected);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayTime = nextDay.getTime();
    const nextMonthTime = dateState.dateMonthNext.getTime();
    const hasNextMonth = scheduled.some(({
      dateTime
    }) => dateTime >= nextMonthTime);
    const hasNextDay = hasNextMonth || scheduled.some(({
      dateTime
    }) => dateTime >= nextDayTime);
    const lastDay = hasNextMonth ? 42 // more than days in month
    : scheduled.reduce((lastDay, {
      date
    }) => {
      return date.getFullYear() === dateState.dateMonth.getFullYear() && date.getMonth() === dateState.dateMonth.getMonth() ? Math.max(lastDay, date.getDate()) : lastDay;
    }, 0);
    return [hasNextMonth, hasNextDay, lastDay];
  }, [dateState, scheduled]);

  const _nextMonth = useCallback(() => setDateState(({
    dateMonth,
    dateSelected
  }) => getDateState(nextMonth(dateMonth), dateSelected)), []);

  const _prevMonth = useCallback(() => setDateState(({
    dateMonth,
    dateSelected
  }) => getDateState(prevMonth(dateMonth), dateSelected)), []);

  const _nextDay = useCallback(() => setDateState(({
    dateSelected
  }) => {
    const date = new Date(dateSelected);
    date.setDate(date.getDate() + 1);
    return getDateState(date, date);
  }), []);

  const _prevDay = useCallback(() => setDateState(({
    dateSelected
  }) => {
    const date = new Date(dateSelected);
    date.setDate(date.getDate() - 1);
    return getDateState(date, date);
  }), []);

  const _setDay = useCallback(day => setDateState(({
    dateMonth
  }) => {
    const date = new Date(dateMonth);
    date.setDate(day);
    return getDateState(date, date);
  }), []);

  const _setAllEventsView = useCallback(v => setAllEventsView(v), []);

  return /*#__PURE__*/_jsxs("main", {
    className: className,
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), /*#__PURE__*/_jsxs("div", {
      className: "calendarFlex",
      children: [/*#__PURE__*/_jsx(Month, {
        hasNextMonth: hasNextMonth,
        lastDay: lastDay,
        now: now,
        scheduled: scheduled,
        setDay: _setDay,
        setNextMonth: _nextMonth,
        setPrevMonth: _prevMonth,
        state: dateState
      }), /*#__PURE__*/_jsx("div", {
        className: "wrapper-style",
        children: allEventsView ? /*#__PURE__*/_jsx(UpcomingEvents, {
          className: "upcoming-events",
          scheduled: scheduled,
          setView: _setAllEventsView
        }) : /*#__PURE__*/_jsx(Day, {
          date: dateState.dateSelected,
          hasNextDay: hasNextDay,
          now: now,
          scheduled: scheduled,
          setNextDay: _nextDay,
          setPrevDay: _prevDay,
          setView: _setAllEventsView
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(CalendarApp).withConfig({
  displayName: "src",
  componentId: "sc-14v0xlq-0"
})([".calendarFlex{align-items:flex-start;display:flex;flex-wrap:nowrap;.wrapper-style{flex:1;.upcoming-events{position:relative;max-width:100%;}}> div{background-color:var(--bg-table);border:1px solid var(--border-table);border-radius:0.25rem;&+div{margin-left:1.5rem;}.ui--Button-Group{margin-top:0;}}h1{align-items:center;border-bottom:0.25rem solid var(--bg-page);display:flex;justify-content:space-between;padding:0.5rem 0.5rem 0 1rem;.all-events-button{margin-right:1rem;}.ui--Button{font-size:1rem;}}}"]));