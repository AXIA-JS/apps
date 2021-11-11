"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _Day = _interopRequireDefault(require("./Day.cjs"));

var _Month = _interopRequireDefault(require("./Month.cjs"));

var _translate = require("./translate.cjs");

var _UpcomingEvents = _interopRequireDefault(require("./UpcomingEvents.cjs"));

var _useScheduled = _interopRequireDefault(require("./useScheduled.cjs"));

var _util = require("./util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0
const NOW_INC = 30 * 1000;

function CalendarApp({
  basePath,
  className
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const scheduled = (0, _useScheduled.default)();
  const [now, setNow] = (0, _react.useState)(() => new Date());
  const [dateState, setDateState] = (0, _react.useState)(() => (0, _util.getDateState)(now, now));
  const [allEventsView, setAllEventsView] = (0, _react.useState)(false);
  const itemsRef = (0, _react.useRef)([{
    isRoot: true,
    name: 'view',
    text: t('Upcoming events')
  }]);
  (0, _react.useEffect)(() => {
    const intervalId = setInterval(() => setNow(new Date()), NOW_INC);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const [hasNextMonth, hasNextDay, lastDay] = (0, _react.useMemo)(() => {
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

  const _nextMonth = (0, _react.useCallback)(() => setDateState(({
    dateMonth,
    dateSelected
  }) => (0, _util.getDateState)((0, _util.nextMonth)(dateMonth), dateSelected)), []);

  const _prevMonth = (0, _react.useCallback)(() => setDateState(({
    dateMonth,
    dateSelected
  }) => (0, _util.getDateState)((0, _util.prevMonth)(dateMonth), dateSelected)), []);

  const _nextDay = (0, _react.useCallback)(() => setDateState(({
    dateSelected
  }) => {
    const date = new Date(dateSelected);
    date.setDate(date.getDate() + 1);
    return (0, _util.getDateState)(date, date);
  }), []);

  const _prevDay = (0, _react.useCallback)(() => setDateState(({
    dateSelected
  }) => {
    const date = new Date(dateSelected);
    date.setDate(date.getDate() - 1);
    return (0, _util.getDateState)(date, date);
  }), []);

  const _setDay = (0, _react.useCallback)(day => setDateState(({
    dateMonth
  }) => {
    const date = new Date(dateMonth);
    date.setDate(day);
    return (0, _util.getDateState)(date, date);
  }), []);

  const _setAllEventsView = (0, _react.useCallback)(v => setAllEventsView(v), []);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "calendarFlex",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Month.default, {
        hasNextMonth: hasNextMonth,
        lastDay: lastDay,
        now: now,
        scheduled: scheduled,
        setDay: _setDay,
        setNextMonth: _nextMonth,
        setPrevMonth: _prevMonth,
        state: dateState
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "wrapper-style",
        children: allEventsView ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_UpcomingEvents.default, {
          className: "upcoming-events",
          scheduled: scheduled,
          setView: _setAllEventsView
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Day.default, {
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

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(CalendarApp).withConfig({
  displayName: "src",
  componentId: "sc-c7tggc-0"
})([".calendarFlex{align-items:flex-start;display:flex;flex-wrap:nowrap;.wrapper-style{flex:1;.upcoming-events{position:relative;max-width:100%;}}> div{background-color:var(--bg-table);border:1px solid var(--border-table);border-radius:0.25rem;&+div{margin-left:1.5rem;}.ui--Button-Group{margin-top:0;}}h1{align-items:center;border-bottom:0.25rem solid var(--bg-page);display:flex;justify-content:space-between;padding:0.5rem 0.5rem 0 1rem;.all-events-button{margin-right:1rem;}.ui--Button{font-size:1rem;}}}"]));

exports.default = _default;