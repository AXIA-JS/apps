"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNonEmptyString = useNonEmptyString;

var _useFormField = require("./useFormField.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function isValid(value) {
  return value && value.length > 0 || false;
}

function useNonEmptyString() {
  let initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return (0, _useFormField.useFormField)(initialValue, isValid);
}