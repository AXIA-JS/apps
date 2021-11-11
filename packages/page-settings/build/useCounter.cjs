"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCounter;

var _useExtensions = _interopRequireDefault(require("./useExtensions.cjs"));

// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useCounter() {
  const {
    count
  } = (0, _useExtensions.default)();
  return count;
}