"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _appSigning = _interopRequireDefault(require("@axia-js/app-signing"));

// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function create(t) {
  return {
    Component: _appSigning.default,
    display: {
      needsAccounts: true,
      needsApi: []
    },
    group: 'developer',
    icon: 'signature',
    name: 'signing',
    text: t('nav.signing', 'Sign and verify', {
      ns: 'apps-routing'
    })
  };
}