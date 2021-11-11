"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constsExamples = require("./consts-examples.cjs");

var _extrinsicsExamples = require("./extrinsics-examples.cjs");

var _rpcExamples = require("./rpc-examples.cjs");

var _storageExamples = require("./storage-examples.cjs");

// Copyright 2017-2021 @axia-js/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0
const snippets = [_rpcExamples.rpcNetworkAuthoring, _rpcExamples.rpcNewHead, _rpcExamples.rpcQueryState, _rpcExamples.rpcSysthemInfo, _storageExamples.storageGetInfo, _storageExamples.storageSystemEvents, _storageExamples.storageListenToBalanceChange, _storageExamples.storageListenToMultipleBalancesChange, _storageExamples.storageRetrieveInfoOnQueryKeys, _storageExamples.storageKeys, _constsExamples.constsStakingParameters, _extrinsicsExamples.extrinsicMakeTransfer];
var _default = snippets;
exports.default = _default;