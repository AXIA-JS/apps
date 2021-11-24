"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAlphaNetRelay = createAlphaNetRelay;
exports.createBetaNetRelay = createBetaNetRelay;

var _testingRelayBetaNet = require("./testingRelayBetaNet.cjs");

var _testingRelayAlphaNet = require("./testingRelayAlphaNet.cjs");

var _util = require("./util.cjs");

// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createBetaNetRelay(t, firstOnly, withSort) {
  return (0, _util.expandEndpoints)(t, [(0, _testingRelayBetaNet.createBetaNet)(t)], firstOnly, withSort);
}

function createAlphaNetRelay(t, firstOnly, withSort) {
  return (0, _util.expandEndpoints)(t, [(0, _testingRelayAlphaNet.createAlphaNet)(t)], firstOnly, withSort);
}