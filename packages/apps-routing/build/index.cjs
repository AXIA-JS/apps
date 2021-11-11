"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _accounts = _interopRequireDefault(require("./accounts.cjs"));

var _addresses = _interopRequireDefault(require("./addresses.cjs"));

var _assets = _interopRequireDefault(require("./assets.cjs"));

var _bounties = _interopRequireDefault(require("./bounties.cjs"));

var _calendar = _interopRequireDefault(require("./calendar.cjs"));

var _claims = _interopRequireDefault(require("./claims.cjs"));

var _contracts = _interopRequireDefault(require("./contracts.cjs"));

var _council = _interopRequireDefault(require("./council.cjs"));

var _democracy = _interopRequireDefault(require("./democracy.cjs"));

var _explorer = _interopRequireDefault(require("./explorer.cjs"));

var _extrinsics = _interopRequireDefault(require("./extrinsics.cjs"));

var _gilt = _interopRequireDefault(require("./gilt.cjs"));

var _js = _interopRequireDefault(require("./js.cjs"));

var _membership = _interopRequireDefault(require("./membership.cjs"));

var _parachains = _interopRequireDefault(require("./parachains.cjs"));

var _poll = _interopRequireDefault(require("./poll.cjs"));

var _rpc = _interopRequireDefault(require("./rpc.cjs"));

var _settings = _interopRequireDefault(require("./settings.cjs"));

var _signing = _interopRequireDefault(require("./signing.cjs"));

var _society = _interopRequireDefault(require("./society.cjs"));

var _staking = _interopRequireDefault(require("./staking.cjs"));

var _storage = _interopRequireDefault(require("./storage.cjs"));

var _sudo = _interopRequireDefault(require("./sudo.cjs"));

var _techcomm = _interopRequireDefault(require("./techcomm.cjs"));

var _teleport = _interopRequireDefault(require("./teleport.cjs"));

var _transfer = _interopRequireDefault(require("./transfer.cjs"));

var _treasury = _interopRequireDefault(require("./treasury.cjs"));

// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function create(t) {
  return [(0, _accounts.default)(t), (0, _addresses.default)(t), (0, _explorer.default)(t), (0, _claims.default)(t), (0, _poll.default)(t), (0, _transfer.default)(t), (0, _teleport.default)(t), (0, _staking.default)(t), (0, _democracy.default)(t), (0, _council.default)(t), (0, _treasury.default)(t), (0, _bounties.default)(t), (0, _techcomm.default)(t), (0, _membership.default)(t), (0, _parachains.default)(t), (0, _gilt.default)(t), (0, _assets.default)(t), (0, _society.default)(t), (0, _calendar.default)(t), (0, _contracts.default)(t), (0, _storage.default)(t), (0, _extrinsics.default)(t), (0, _rpc.default)(t), (0, _signing.default)(t), (0, _sudo.default)(t), (0, _js.default)(t), (0, _settings.default)(t)];
}