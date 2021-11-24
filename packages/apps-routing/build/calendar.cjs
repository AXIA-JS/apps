"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _appCalendar = _interopRequireDefault(require("@axia-js/app-calendar"));

// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function create(t) {
  return {
    Component: _appCalendar.default,
    display: {
      needsApi: []
    },
    group: 'network',
    icon: 'calendar-alt',
    name: 'calendar',
    text: t('nav.calendar', 'Event calendar', {
      ns: 'apps-routing'
    })
  };
}