"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _util = require("@axia-js/util");

var _LeaseBlocks = _interopRequireDefault(require("./LeaseBlocks.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Periods({
  className,
  fromFirst,
  leasePeriod,
  periods
}) {
  const mapped = (0, _react.useMemo)(() => (leasePeriod === null || leasePeriod === void 0 ? void 0 : leasePeriod.currentPeriod) && periods && periods.reduce((all, period) => {
    const bnp = leasePeriod.currentPeriod.addn(period);

    if (!all.length || all[all.length - 1][1].add(_util.BN_ONE).lt(bnp)) {
      all.push([bnp, bnp]);
    } else {
      all[all.length - 1][1] = bnp;
    }

    return all;
  }, []).map(([a, b]) => a.eq(b) ? (0, _util.formatNumber)(a) : `${(0, _util.formatNumber)(a)} - ${(0, _util.formatNumber)(b)}`).join(', '), [leasePeriod === null || leasePeriod === void 0 ? void 0 : leasePeriod.currentPeriod, periods]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: mapped
    }), periods && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LeaseBlocks.default, {
      leasePeriod: leasePeriod,
      value: fromFirst ? periods[0] : periods[periods.length - 1] + 1
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Periods);

exports.default = _default;