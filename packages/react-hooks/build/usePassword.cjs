"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePassword = usePassword;

var _react = require("react");

var _uiKeyring = require("@axia-js/ui-keyring");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function usePassword() {
  const [password, setPassword] = (0, _react.useState)('');
  const [isPasswordValid, setIsPasswordValid] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    setIsPasswordValid(_uiKeyring.keyring.isPassValid(password));
  }, [password]);
  return {
    isPasswordValid,
    password,
    setIsPasswordValid,
    setPassword
  };
}