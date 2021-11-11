"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withCalls;

var _call = _interopRequireDefault(require("./call.cjs"));

// Copyright 2017-2021 @axia-js/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0
function withCalls(...calls) {
  return Component => {
    // NOTE: Order is reversed so it makes sense in the props, i.e. component
    // after something can use the value of the preceding version
    return calls.reverse().reduce((Component, call) => {
      return Array.isArray(call) ? (0, _call.default)(...call)(Component) : (0, _call.default)(call)(Component);
    }, Component);
  };
}