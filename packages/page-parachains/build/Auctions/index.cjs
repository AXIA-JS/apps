"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _Auction = _interopRequireDefault(require("./Auction.cjs"));

var _Bid = _interopRequireDefault(require("./Bid.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Auctions({
  auctionInfo,
  campaigns,
  className,
  ownedIds,
  winningData
}) {
  const lastWinners = winningData && winningData[0];
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      auctionInfo: auctionInfo,
      lastWinners: lastWinners
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Bid.default, {
        auctionInfo: auctionInfo,
        lastWinners: lastWinners,
        ownedIds: ownedIds
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Auction.default, {
      auctionInfo: auctionInfo,
      campaigns: campaigns,
      winningData: winningData
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Auctions);

exports.default = _default;