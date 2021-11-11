"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0
const DAY_TO_MS = 24 * 60 * 60 * 1000;

function MonthDay({
  className = '',
  dateMonth,
  day,
  isCurrent,
  isDisabled,
  scheduled,
  setDay
}) {
  const hasEvents = (0, _react.useMemo)(() => {
    const start = dateMonth.getTime() + (day - 1) * DAY_TO_MS;
    const end = start + DAY_TO_MS;
    return scheduled.some(({
      dateTime
    }) => dateTime >= start && dateTime < end);
  }, [dateMonth, day, scheduled]);

  const _onClick = (0, _react.useCallback)(() => {
    !isDisabled && setDay(day);
  }, [day, isDisabled, setDay]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `day${isDisabled ? ' isDisabled' : isCurrent ? ' highlight--bg-light highlight--color isSelected' : ''} ${className}`,
    onClick: _onClick,
    children: [day, hasEvents && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "eventIndicator highlight--border"
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(MonthDay).withConfig({
  displayName: "MonthDay",
  componentId: "sc-pwicfz-0"
})(["background-color:transparent;border:1px solid transparent;border-radius:50%;line-height:1;padding:1rem;position:relative;text-align:center;z-index:1;&:before{border-radius:50%;}&:not(.isDisabled){cursor:pointer;}&:not(.isSelected):hover{background:#f7f5f3;}.eventIndicator{border:0.25rem solid transparent;border-radius:50%;height:0.25rem;position:absolute;right:0.625rem;top:0.625rem;width:0.25rem;}&.isDisabled{opacity:0.375;&:hover{background:transparent;}.eventIndicator{display:none;}}"]));

exports.default = _default;