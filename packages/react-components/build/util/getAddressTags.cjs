"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAddressTags = getAddressTags;

var _getAddressMeta = require("./getAddressMeta.cjs");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function getAddressTags(address) {
  let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return (0, _getAddressMeta.getAddressMeta)(address, type).tags || [];
}