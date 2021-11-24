"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.externalLinks = void 0;

var _commonwealth = _interopRequireDefault(require("./commonwealth.cjs"));

var _dotreasury = _interopRequireDefault(require("./dotreasury.cjs"));

var _dotscanner = _interopRequireDefault(require("./dotscanner.cjs"));

var _polkascan = _interopRequireDefault(require("./polkascan.cjs"));

var _polkassembly = require("./polkassembly.cjs");

var _polkastats = _interopRequireDefault(require("./polkastats.cjs"));

var _statescan = _interopRequireDefault(require("./statescan.cjs"));

var _subid = _interopRequireDefault(require("./subid.cjs"));

var _subscan = _interopRequireDefault(require("./subscan.cjs"));

// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
const externalLinks = {
  Commonwealth: _commonwealth.default,
  DotScanner: _dotscanner.default,
  Dotreasury: _dotreasury.default,
  Polkascan: _polkascan.default,
  PolkassemblyIo: _polkassembly.PolkassemblyIo,
  PolkassemblyNetwork: _polkassembly.PolkassemblyNetwork,
  Polkastats: _polkastats.default,
  Statescan: _statescan.default,
  SubId: _subid.default,
  Subscan: _subscan.default
};
exports.externalLinks = externalLinks;