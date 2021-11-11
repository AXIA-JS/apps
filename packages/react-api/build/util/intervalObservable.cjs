"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = intervalObservable;

var _rxjs = require("rxjs");

// Copyright 2017-2021 @axia-js/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0
const interval$ = (0, _rxjs.interval)(500);

function intervalObservable(that) {
  return interval$.subscribe(() => {
    const elapsed = Date.now() - (that.state.callUpdatedAt || 0);
    const callUpdated = elapsed <= 1500;

    if (callUpdated !== that.state.callUpdated) {
      that.setState({
        callUpdated
      });
    }
  });
}