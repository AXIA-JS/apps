"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.QueueProvider = exports.QueueConsumer = void 0;

var _react = _interopRequireDefault(require("react"));

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const defaultState = {
  stqueue: [],
  txqueue: []
};

const StatusContext = /*#__PURE__*/_react.default.createContext(defaultState);

const QueueConsumer = StatusContext.Consumer;
exports.QueueConsumer = QueueConsumer;
const QueueProvider = StatusContext.Provider;
exports.QueueProvider = QueueProvider;
var _default = StatusContext;
exports.default = _default;