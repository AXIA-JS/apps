"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBountyStatus = useBountyStatus;

var _react = require("react");

var _helpers = require("@axia-js/app-bounties/helpers");

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useBountyStatus(status) {
  const updateStatus = (0, _react.useCallback)(() => (0, _helpers.getBountyStatus)(status), [status]);
  return updateStatus();
}