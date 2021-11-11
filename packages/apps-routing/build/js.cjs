"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _appJs = _interopRequireDefault(require("@axia-js/app-js"));

// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function create(t) {
  return {
    Component: _appJs.default,
    display: {
      needsApi: []
    },
    group: 'developer',
    icon: 'code',
    name: 'js',
    text: t('nav.js', 'JavaScript', {
      ns: 'apps-routing'
    })
  };
}