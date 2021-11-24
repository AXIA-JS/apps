"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _appRpc = _interopRequireDefault(require("@axia-js/app-rpc"));

// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function create(t) {
  return {
    Component: _appRpc.default,
    display: {
      needsApi: []
    },
    group: 'developer',
    icon: 'network-wired',
    name: 'rpc',
    text: t('nav.rpc', 'RPC calls', {
      ns: 'apps-routing'
    })
  };
}