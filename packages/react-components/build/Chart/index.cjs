"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Doughnut = _interopRequireDefault(require("./Doughnut.cjs"));

var _HorizBar = _interopRequireDefault(require("./HorizBar.cjs"));

var _Line = _interopRequireDefault(require("./Line.cjs"));

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const Chart = {
  Doughnut: _Doughnut.default,
  HorizBar: _HorizBar.default,
  Line: _Line.default
};
var _default = Chart;
exports.default = _default;