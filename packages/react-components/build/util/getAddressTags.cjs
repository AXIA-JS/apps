"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAddressTags = getAddressTags;

var _getAddressMeta = require("./getAddressMeta.cjs");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function getAddressTags(address, type = null) {
  return (0, _getAddressMeta.getAddressMeta)(address, type).tags || [];
}