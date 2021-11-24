"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOWEST_USER_ID = exports.LOWEST_PUBLIC_ID = exports.LOWEST_INVALID_ID = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
const LOWEST_PUBLIC_ID = new _bn.default(2000);
exports.LOWEST_PUBLIC_ID = LOWEST_PUBLIC_ID;
const LOWEST_INVALID_ID = LOWEST_PUBLIC_ID.sub(_util.BN_ONE);
exports.LOWEST_INVALID_ID = LOWEST_INVALID_ID;
const LOWEST_USER_ID = _util.BN_THOUSAND;
exports.LOWEST_USER_ID = LOWEST_USER_ID;