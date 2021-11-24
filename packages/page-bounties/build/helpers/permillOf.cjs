"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permillOf = permillOf;

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function permillOf(value, perMill) {
  return value.mul(perMill).div(_util.BN_MILLION);
}