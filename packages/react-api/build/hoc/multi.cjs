"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withMulti;

// Copyright 2017-2021 @axia-js/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0
function withMulti(Component) {
  for (var _len = arguments.length, hocs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    hocs[_key - 1] = arguments[_key];
  }

  // NOTE: Order is reversed so it makes sense in the props, i.e. component
  // after something can use the value of the preceding version
  return hocs.reverse().reduce((Component, hoc) => hoc(Component), Component);
}