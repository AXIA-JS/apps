"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _appContracts = _interopRequireDefault(require("@axia-js/app-contracts"));

// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function create(t) {
  return {
    Component: _appContracts.default,
    display: {
      needsAccounts: true,
      needsApi: ['tx.contracts.instantiateWithCode']
    },
    group: 'developer',
    icon: 'compress',
    name: 'contracts',
    text: t('nav.contracts', 'Contracts', {
      ns: 'apps-routing'
    })
  };
}