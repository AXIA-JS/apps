"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _FundAdd = _interopRequireDefault(require("./FundAdd.cjs"));

var _Funds = _interopRequireDefault(require("./Funds.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Crowdloan({
  auctionInfo,
  campaigns: {
    activeCap,
    activeRaised,
    funds,
    totalCap,
    totalRaised
  },
  className,
  leasePeriod,
  ownedIds
}) {
  const bestNumber = (0, _reactHooks.useBestNumber)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      activeCap: activeCap,
      activeRaised: activeRaised,
      fundCount: funds ? funds.length : 0,
      totalCap: totalCap,
      totalRaised: totalRaised
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FundAdd.default, {
        auctionInfo: auctionInfo,
        bestNumber: bestNumber,
        leasePeriod: leasePeriod,
        ownedIds: ownedIds
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Funds.default, {
      bestNumber: bestNumber,
      leasePeriod: leasePeriod,
      value: funds
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Crowdloan);

exports.default = _default;