"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Base = _interopRequireDefault(require("./Base.cjs"));

var _Divider = _interopRequireDefault(require("./Divider.cjs"));

var _Header = _interopRequireDefault(require("./Header.cjs"));

var _Item = _interopRequireDefault(require("./Item.cjs"));

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const Menu = _Base.default;
Menu.Divider = _Divider.default;
Menu.Item = _Item.default;
Menu.Header = _Header.default;
var _default = Menu;
exports.default = _default;