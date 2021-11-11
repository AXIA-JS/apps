"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNonZeroBn = useNonZeroBn;

var _react = require("react");

var _util = require("@axia-js/util");

var _useFormField = require("./useFormField.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function isValid(value) {
  return !value.isZero();
}

function useNonZeroBn(initialValue = _util.BN_ZERO) {
  const value = (0, _react.useMemo)(() => (0, _util.bnToBn)(initialValue), [initialValue]);
  return (0, _useFormField.useFormField)(value, isValid);
}