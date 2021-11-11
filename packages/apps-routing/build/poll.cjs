"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _appPoll = _interopRequireDefault(require("@axia-js/app-poll"));

// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function create(t) {
  return {
    Component: _appPoll.default,
    display: {
      needsAccounts: true,
      needsApi: ['tx.poll.vote']
    },
    group: 'governance',
    icon: 'podcast',
    name: 'poll',
    text: t('nav.poll', 'Token poll', {
      ns: 'apps-routing'
    })
  };
}