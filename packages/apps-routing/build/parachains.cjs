"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _appParachains = _interopRequireDefault(require("@axia-js/app-parachains"));

// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function create(t) {
  return {
    Component: _appParachains.default,
    display: {
      needsApi: [// children - parachainInfo.arachainId / parachainUpgrade.didSetValidationCode
      ['query.paras.parachains']]
    },
    group: 'network',
    icon: 'link',
    name: 'parachains',
    text: t('nav.parachains', 'Parachains', {
      ns: 'apps-routing'
    })
  };
}