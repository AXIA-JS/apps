"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _appAssets = _interopRequireDefault(require("@axia-js/app-assets"));

// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function create(t) {
  return {
    Component: _appAssets.default,
    display: {
      needsApi: ['tx.assets.setMetadata', 'tx.assets.transferKeepAlive']
    },
    group: 'network',
    icon: 'shopping-basket',
    name: 'assets',
    text: t('nav.assets', 'Assets', {
      ns: 'apps-routing'
    })
  };
}