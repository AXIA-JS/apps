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

var _DayHour = _interopRequireDefault(require("./DayHour.cjs"));

var _DayTime = _interopRequireDefault(require("./DayTime.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0
const HOURS = (() => {
  const hours = [];

  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }

  return hours;
})();

function Day(_ref) {
  let {
    className,
    date,
    hasNextDay,
    now,
    scheduled,
    setNextDay,
    setPrevDay,
    setView
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const monthRef = (0, _react.useRef)(_constants.MONTHS.map(m => t(m)));
  const [isToday, nowHours, nowMinutes] = (0, _react.useMemo)(() => [date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear() && date.getDate() === now.getDate(), now.getHours(), now.getMinutes()], [date, now]);

  const _setView = (0, _react.useCallback)(() => setView(true), [setView]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("h1", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          className: "all-events-button",
          icon: 'list',
          onClick: _setView
        }), date.getDate(), " ", monthRef.current[date.getMonth()], " ", date.getFullYear(), " ", isToday && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DayTime.default, {})]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "chevron-left",
          isDisabled: isToday,
          onClick: setPrevDay
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "chevron-right",
          isDisabled: !hasNextDay,
          onClick: setNextDay
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "hoursContainer highlight--bg-faint",
      children: HOURS.map((hour, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_DayHour.default, {
        date: date,
        hour: hour,
        index: index,
        minutes: isToday && nowHours === index ? nowMinutes : 0,
        scheduled: scheduled
      }, hour))
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Day).withConfig({
  displayName: "Day",
  componentId: "sc-7qsj4x-0"
})(["flex:1;.dayHeader{align-items:center;display:flex;font-size:1.25rem;justify-content:space-between;padding:1rem 1.5rem 0;}.hoursContainer{z-index:1;}"]));

exports.default = _default;