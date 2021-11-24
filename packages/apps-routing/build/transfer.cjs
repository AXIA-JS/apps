"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _Transfer = _interopRequireDefault(require("@axia-js/app-accounts/modals/Transfer"));

// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function create(t) {
  return {
    Component: _Transfer.default,
    Modal: _Transfer.default,
    display: {
      isHidden: false,
      needsAccounts: true,
      needsApi: ['tx.balances.transfer']
    },
    group: 'accounts',
    icon: 'paper-plane',
    name: 'transfer',
    text: t('nav.transfer', 'Transfer', {
      ns: 'apps-routing'
    })
  };
}