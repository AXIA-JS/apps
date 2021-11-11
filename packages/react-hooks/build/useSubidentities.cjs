"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSubidentities = useSubidentities;

var _useApi = require("./useApi.cjs");

var _useCall2 = require("./useCall.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useSubidentities(address) {
  var _useCall, _api$query$identity;

  const {
    api
  } = (0, _useApi.useApi)();
  return (_useCall = (0, _useCall2.useCall)((_api$query$identity = api.query.identity) === null || _api$query$identity === void 0 ? void 0 : _api$query$identity.subsOf, [address])) === null || _useCall === void 0 ? void 0 : _useCall[1];
}