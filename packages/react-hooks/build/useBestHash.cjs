"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBestHash = useBestHash;

var _useApi = require("./useApi.cjs");

var _useCall = require("./useCall.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
const optCall = {
  transform: header => header.hash.toHex()
};

function useBestHash() {
  const {
    api
  } = (0, _useApi.useApi)();
  return (0, _useCall.useCall)(api.rpc.chain.subscribeNewHeads, undefined, optCall);
}