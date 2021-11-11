"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useChangeCalc;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _util2 = require("./util.cjs");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useChangeCalc(threshold, votedAye, votedNay, votedTotal) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const sqrtElectorate = (0, _reactHooks.useCall)(api.derive.democracy.sqrtElectorate);
  const [result, setResult] = (0, _react.useState)({
    changeAye: _util.BN_ZERO,
    changeNay: _util.BN_ZERO
  });
  (0, _react.useEffect)(() => {
    sqrtElectorate && setResult((0, _util2.approxChanges)(threshold, sqrtElectorate, {
      votedAye,
      votedNay,
      votedTotal
    }));
  }, [sqrtElectorate, threshold, votedAye, votedNay, votedTotal]);
  return result;
}