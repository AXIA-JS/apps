"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newZeroDate = newZeroDate;
exports.nextMonth = nextMonth;
exports.prevMonth = prevMonth;
exports.getDateState = getDateState;
exports.dateCalendarFormat = dateCalendarFormat;

var _constants = require("./constants.cjs");

// Copyright 2017-2021 @axia-js/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0
function newZeroDate(input) {
  const date = new Date(input);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

function nextMonth(date, firstDay = 1) {
  const currMonth = date.getMonth();
  return currMonth === 11 ? new Date(date.getFullYear() + 1, 0, firstDay) : new Date(date.getFullYear(), currMonth + 1, firstDay);
}

function prevMonth(date) {
  const currMonth = date.getMonth();
  return currMonth === 0 ? new Date(date.getFullYear() - 1, 11, 1) : new Date(date.getFullYear(), currMonth - 1, 1);
}

function getDateState(_dateMonth, _dateSelected) {
  const dateMonth = newZeroDate(_dateMonth);
  dateMonth.setDate(1);
  const dateMonthNext = nextMonth(dateMonth);
  const dateSelected = newZeroDate(_dateSelected);
  const numDays = nextMonth(dateMonth, 0).getDate();
  const days = [];

  for (let i = 1; i <= numDays; i++) {
    days.push(i);
  }

  return {
    dateMonth,
    dateMonthNext,
    dateSelected,
    days,
    startClass: `start${_constants.DAYS[dateMonth.getDay()]}`
  };
}

function dateCalendarFormat(date) {
  return new Date(date).toISOString().split('.')[0].replaceAll('-', '').replaceAll(':', '') + 'Z';
}