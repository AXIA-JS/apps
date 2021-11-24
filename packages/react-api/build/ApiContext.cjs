"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ApiProvider = exports.ApiConsumer = void 0;

var _react = _interopRequireDefault(require("react"));

// Copyright 2017-2021 @axia-js/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0
const ApiContext = /*#__PURE__*/_react.default.createContext({});

const ApiConsumer = ApiContext.Consumer;
exports.ApiConsumer = ApiConsumer;
const ApiProvider = ApiContext.Provider;
exports.ApiProvider = ApiProvider;
var _default = ApiContext;
exports.default = _default;