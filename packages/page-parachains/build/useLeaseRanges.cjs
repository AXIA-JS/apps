"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLeaseRanges = useLeaseRanges;
exports.useLeaseRangeMax = useLeaseRangeMax;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
const RANGES_DEFAULT = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 1], [1, 2], [1, 3], [2, 2], [2, 3], [3, 3]];

function isU32(leasePeriodsPerSlot) {
  return !!leasePeriodsPerSlot;
}

function useLeaseRanges() {
  const {
    api
  } = (0, _reactHooks.useApi)();
  return (0, _react.useMemo)(() => {
    var _api$consts$auctions;

    if (isU32((_api$consts$auctions = api.consts.auctions) === null || _api$consts$auctions === void 0 ? void 0 : _api$consts$auctions.leasePeriodsPerSlot)) {
      const ranges = [];

      for (let i = 0; api.consts.auctions.leasePeriodsPerSlot.gtn(i); i++) {
        for (let j = i; api.consts.auctions.leasePeriodsPerSlot.gtn(j); j++) {
          ranges.push([i, j]);
        }
      }

      return ranges;
    }

    return RANGES_DEFAULT;
  }, [api]);
}

function useLeaseRangeMax() {
  const ranges = useLeaseRanges();
  return (0, _react.useMemo)(() => new _bn.default(ranges[ranges.length - 1][1]), [ranges]);
}