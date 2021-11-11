"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWeightFee = useWeightFee;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = require("react");

var _util = require("@axia-js/util");

var _useApi = require("./useApi.cjs");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useWeightFee(weight, apiOverride) {
  const {
    api
  } = (0, _useApi.useApi)();
  return (0, _react.useMemo)(() => {
    var _consts$transactionPa;

    return (0, _util.isUndefined)(apiOverride) || apiOverride ? (((_consts$transactionPa = (apiOverride || api).consts.transactionPayment) === null || _consts$transactionPa === void 0 ? void 0 : _consts$transactionPa.weightToFee) || []).reduce((acc, {
      coeffFrac,
      coeffInteger,
      degree,
      negative
    }) => {
      const w = (0, _util.bnToBn)(weight).pow(degree);
      const frac = coeffFrac.mul(w).div(_util.BN_BILLION);
      const integer = coeffInteger.mul(w);

      if (negative.isTrue) {
        acc.isub(frac);
        acc.isub(integer);
      } else {
        acc.iadd(frac);
        acc.iadd(integer);
      }

      return acc;
    }, new _bn.default(0)) : _util.BN_ZERO;
  }, [api, apiOverride, weight]);
}