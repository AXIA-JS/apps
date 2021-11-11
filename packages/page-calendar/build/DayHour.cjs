"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _DayItem = _interopRequireDefault(require("./DayItem.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0
const MN_TO_MS = 60 * 1000;
const HR_TO_MS = 60 * MN_TO_MS;

function filterEntries(date, minutes, index, scheduled) {
  const start = date.getTime() + index * HR_TO_MS;
  const end = start + HR_TO_MS;
  const explicit = start + minutes * MN_TO_MS;
  return scheduled.filter(({
    dateTime
  }) => dateTime >= explicit && dateTime < end).sort((a, b) => a.dateTime - b.dateTime || a.type.localeCompare(b.type));
}

function DayHour({
  className = '',
  date,
  hour,
  index,
  minutes,
  scheduled
}) {
  const filtered = (0, _react.useMemo)(() => filterEntries(date, minutes, index, scheduled), [date, index, minutes, scheduled]);
  const hourStr = `${` ${hour}`.slice(-2)} ${hour >= 12 ? 'pm' : 'am'}`;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `${className}${filtered.length ? ' hasItems' : ''}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: `hourLabel${filtered.length ? ' highlight--color' : ''}`,
      children: hourStr
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "hourContainer",
      children: filtered.map((item, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_DayItem.default, {
        item: item
      }, index))
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(DayHour).withConfig({
  displayName: "DayHour",
  componentId: "sc-1353c0x-0"
})(["align-items:center;display:flex;position:relative;z-index:2;&:nth-child(odd){background:var(--bg-table);}&.isPast{opacity:0.75;}.hourContainer{flex:1;padding:0.25rem 0;}.hourLabel{flex:0;font-size:0.85rem;font-weight:var(--font-weight-normal);line-height:1;min-width:5.5rem;opacity:0.5;padding:0.5rem 1rem;text-align:right;text-transform:uppercase;z-index:1;}&.hasItems .hourLabel{font-size:1.1rem;font-weight:var(--font-weight-normal);opacity:1;padding:0.7rem 1rem;}"]));

exports.default = _default;