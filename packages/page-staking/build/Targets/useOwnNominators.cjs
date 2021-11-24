"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useOwnNominators;

var _react = require("react");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useOwnNominators(ownStashes) {
  return (0, _react.useMemo)(() => ownStashes && ownStashes.filter(_ref => {
    let {
      isOwnController,
      isStashValidating
    } = _ref;
    return isOwnController && !isStashValidating;
  }), [ownStashes]);
}