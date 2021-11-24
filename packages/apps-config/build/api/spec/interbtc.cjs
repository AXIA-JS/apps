"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _interbtcTypes = _interopRequireDefault(require("@interlay/interbtc-types"));

// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
// This is a temp work-around to add the interfaces key to the actual types
// With the next release of the API this should be able tp be added to the base
const extended = _interbtcTypes.default;
var _default = extended;
exports.default = _default;