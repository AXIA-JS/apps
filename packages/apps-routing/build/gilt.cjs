"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _appGilt = _interopRequireDefault(require("@axia-js/app-gilt"));

// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function create(t) {
  return {
    Component: _appGilt.default,
    display: {
      needsApi: ['tx.gilt.placeBid', 'query.proxy.proxies']
    },
    group: 'network',
    icon: 'leaf',
    name: 'gilt',
    text: t('nav.gilt', 'Gilt', {
      ns: 'apps-routing'
    })
  };
}