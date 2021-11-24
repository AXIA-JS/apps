// Copyright 2017-2021 @axia-js/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
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
  const hasEvents = useMemo(() => {
    const start = dateMonth.getTime() + (day - 1) * DAY_TO_MS;
    const end = start + DAY_TO_MS;
    return scheduled.some(({
      dateTime
    }) => dateTime >= start && dateTime < end);
  }, [dateMonth, day, scheduled]);

  const _onClick = useCallback(() => {
    !isDisabled && setDay(day);
  }, [day, isDisabled, setDay]);

  return /*#__PURE__*/_jsxs("div", {
    className: `day${isDisabled ? ' isDisabled' : isCurrent ? ' highlight--bg-light highlight--color isSelected' : ''} ${className}`,
    onClick: _onClick,
    children: [day, hasEvents && /*#__PURE__*/_jsx("div", {
      className: "eventIndicator highlight--border"
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(MonthDay).withConfig({
  displayName: "MonthDay",
  componentId: "sc-p50171-0"
})(["background-color:transparent;border:1px solid transparent;border-radius:50%;line-height:1;padding:1rem;position:relative;text-align:center;z-index:1;&:before{border-radius:50%;}&:not(.isDisabled){cursor:pointer;}&:not(.isSelected):hover{background:#f7f5f3;}.eventIndicator{border:0.25rem solid transparent;border-radius:50%;height:0.25rem;position:absolute;right:0.625rem;top:0.625rem;width:0.25rem;}&.isDisabled{opacity:0.375;&:hover{background:transparent;}.eventIndicator{display:none;}}"]));