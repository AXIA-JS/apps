"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCounter;

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useCounter() {
  var _api$query$society;

  const {
    api
  } = (0, _reactHooks.useApi)();
  const bids = (0, _reactHooks.useCall)((_api$query$society = api.query.society) === null || _api$query$society === void 0 ? void 0 : _api$query$society.candidates);
  return (bids === null || bids === void 0 ? void 0 : bids.length) || 0;
}