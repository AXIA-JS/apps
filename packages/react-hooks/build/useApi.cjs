"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useApi = useApi;

var _react = require("react");

var _reactApi = require("@axia-js/react-api");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useApi() {
  return (0, _react.useContext)(_reactApi.ApiContext);
}