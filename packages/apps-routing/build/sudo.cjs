"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _appSudo = _interopRequireDefault(require("@axia-js/app-sudo"));

// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function create(t) {
  return {
    Component: _appSudo.default,
    display: {
      needsAccounts: true,
      needsApi: ['tx.sudo.setKey'],
      needsSudo: true
    },
    group: 'developer',
    icon: 'unlock',
    name: 'sudo',
    text: t('nav.sudo', 'Sudo', {
      ns: 'apps-routing'
    })
  };
}