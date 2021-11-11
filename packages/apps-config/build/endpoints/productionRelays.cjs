"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAXIALunarRelay = createAXIALunarRelay;
exports.createAXIARelay = createAXIARelay;

var _productionRelayAXIALunar = require("./productionRelayAXIALunar.cjs");

var _productionRelayAXIA = require("./productionRelayAXIA.cjs");

var _util = require("./util.cjs");

// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createAXIALunarRelay(t, firstOnly, withSort) {
  return (0, _util.expandEndpoints)(t, [(0, _productionRelayAXIALunar.createAXIALunar)(t)], firstOnly, withSort);
}

function createAXIARelay(t, firstOnly, withSort) {
  return (0, _util.expandEndpoints)(t, [(0, _productionRelayAXIA.createAXIA)(t)], firstOnly, withSort);
}