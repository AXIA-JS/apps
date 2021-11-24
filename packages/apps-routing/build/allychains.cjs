"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _appAllychains = _interopRequireDefault(require("@axia-js/app-allychains"));

// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function create(t) {
  return {
    Component: _appAllychains.default,
    display: {
      needsApi: [// children - allychainInfo.arachainId / allychainUpgrade.didSetValidationCode
      ['query.paras.allychains']]
    },
    group: 'network',
    icon: 'link',
    name: 'allychains',
    text: t('nav.allychains', 'Allychains', {
      ns: 'apps-routing'
    })
  };
}