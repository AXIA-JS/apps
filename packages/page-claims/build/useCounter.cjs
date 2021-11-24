"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCounter;

var _useAXIAPreclaims = _interopRequireDefault(require("./useAXIAPreclaims.cjs"));

// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useCounter() {
  const needAttest = (0, _useAXIAPreclaims.default)();
  return needAttest.length;
}