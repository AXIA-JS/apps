"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFormField = useFormField;

var _react = require("react");

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
const defaultValidate = () => true;

function useFormField(defaultValue, validate = defaultValidate) {
  const [value, setValue] = (0, _react.useState)(defaultValue);
  const isValid = (0, _react.useMemo)(() => !!value && validate(value), [validate, value]);
  const setter = (0, _react.useCallback)(value => !(0, _util.isUndefined)(value) && setValue(value), []);
  return [value, isValid, setter];
}