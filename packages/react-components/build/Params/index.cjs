"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Call = _interopRequireDefault(require("./Call.cjs"));

var _OpaqueCall = _interopRequireDefault(require("./OpaqueCall.cjs"));

var _Proposal = _interopRequireDefault(require("./Proposal.cjs"));

// Copyright 2017-2021 @axia-js/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0
const components = {
  Call: _Call.default,
  OpaqueCall: _OpaqueCall.default,
  Proposal: _Proposal.default
};
var _default = components;
exports.default = _default;