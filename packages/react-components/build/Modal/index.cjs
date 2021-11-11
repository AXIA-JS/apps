"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Actions = _interopRequireDefault(require("./Actions.cjs"));

var _Base = _interopRequireDefault(require("./Base.cjs"));

var _Columns = _interopRequireDefault(require("./Columns.cjs"));

var _Content = _interopRequireDefault(require("./Content.cjs"));

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const Modal = _Base.default;
Modal.Actions = _Actions.default;
Modal.Columns = _Columns.default;
Modal.Content = _Content.default;
var _default = Modal;
exports.default = _default;