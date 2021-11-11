"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _appExplorer = _interopRequireDefault(require("@axia-js/app-explorer"));

// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function create(t) {
  return {
    Component: _appExplorer.default,
    display: {
      needsApi: []
    },
    group: 'network',
    icon: 'braille',
    name: 'explorer',
    text: t('nav.explorer', 'Explorer', {
      ns: 'apps-routing'
    })
  };
}