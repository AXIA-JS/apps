"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = triggerChange;

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0
function triggerChange(value, ...callOnResult) {
  if (!callOnResult || !callOnResult.length) {
    return;
  }

  callOnResult.forEach(callOnResult => {
    if ((0, _util.isObservable)(callOnResult)) {
      callOnResult.next(value);
    } else if ((0, _util.isFunction)(callOnResult)) {
      callOnResult(value);
    }
  });
}