"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _constants = require("./constants.cjs");

var _MonthDay = _interopRequireDefault(require("./MonthDay.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0
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
  } = (0, _translate.useTranslation)();
  const dayOfWeekRef = (0, _react.useRef)(_constants.DAYS.map(d => t(d)));
  const monthRef = (0, _react.useRef)(_constants.MONTHS.map(m => t(m)));
  const [isCurrYear, isCurrMonth, isNowYear, isNowMonth, isOlderMonth] = (0, _react.useMemo)(() => [dateMonth.getFullYear() === dateSelected.getFullYear(), dateMonth.getMonth() === dateSelected.getMonth(), now.getFullYear() === dateMonth.getFullYear(), now.getMonth() === dateMonth.getMonth(), now.getMonth() > dateMonth.getMonth()], [dateMonth, dateSelected, now]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("h1", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [monthRef.current[dateMonth.getMonth()], " ", dateMonth.getFullYear()]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "chevron-left",
          isDisabled: isNowYear && (isOlderMonth || isNowMonth),
          onClick: setPrevMonth
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "chevron-right",
          isDisabled: !hasNextMonth,
          onClick: setNextMonth
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: `calendar ${startClass}`,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "dayOfWeek",
        children: dayOfWeekRef.current.map(day => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: t(day)
        }, day))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "dateGrid",
        children: days.map(day => /*#__PURE__*/(0, _jsxRuntime.jsx)(_MonthDay.default, {
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

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Month).withConfig({
  displayName: "Month",
  componentId: "sc-ng04mq-0"
})(["flex:0;max-width:max-content;.calendar{padding:1rem 1.5rem;.dateGrid,.dayOfWeek{display:grid;grid-template-columns:repeat(7,1fr);}.dateGrid{margin-top:0.5em;}&.startSun .dateGrid .day:first-child{grid-column:1}&.startMon .dateGrid .day:first-child{grid-column:2}&.startTue .dateGrid .day:first-child{grid-column:3}&.startWed .dateGrid .day:first-child{grid-column:4}&.startThu .dateGrid .day:first-child{grid-column:5}&.startFri .dateGrid .day:first-child{grid-column:6}&.startSat .dateGrid .day:first-child{grid-column:7}.dayOfWeek{> *{font-size:0.7em;font-weight:var(--font-weight-normal);letter-spacing:0.1em;text-align:center;text-transform:uppercase;}}.monthIndicator{align-items:center;display:flex;font-size:1.25rem;justify-content:space-between;}}"]));

exports.default = _default;