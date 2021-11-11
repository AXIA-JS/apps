"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _Teleport = _interopRequireDefault(require("@axia-js/app-parachains/Teleport"));

// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function create(t) {
  return {
    Component: _Teleport.default,
    Modal: _Teleport.default,
    display: {
      isHidden: false,
      needsAccounts: true,
      needsApi: [['tx.xcm.teleportAssets', 'tx.xcmPallet.teleportAssets', 'tx.axiaXcm.teleportAssets']],
      needsTeleport: true
    },
    group: 'accounts',
    icon: 'share-square',
    name: 'teleport',
    text: t('nav.teleport', 'Teleport', {
      ns: 'apps-routing'
    })
  };
}