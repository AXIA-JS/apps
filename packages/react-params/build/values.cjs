"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createValue = createValue;
exports.default = createValues;

var _util = require("@axia-js/util");

var _initValue = _interopRequireDefault(require("./initValue.cjs"));

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createValue(registry, param) {
  const value = (0, _initValue.default)(registry, param.type);
  return {
    isValid: !(0, _util.isUndefined)(value),
    value
  };
}

function createValues(registry, params) {
  return params.map(param => createValue(registry, param));
}