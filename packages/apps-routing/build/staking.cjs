"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _appStaking = _interopRequireDefault(require("@axia-js/app-staking"));

// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function create(t) {
  return {
    Component: _appStaking.default,
    display: {
      needsApi: [['tx.staking.bond']]
    },
    group: 'network',
    icon: 'certificate',
    name: 'staking',
    text: t('nav.staking', 'Staking', {
      ns: 'apps-routing'
    })
  };
}