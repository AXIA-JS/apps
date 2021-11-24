"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Summary(_ref) {
  var _api$query$balances, _api$consts$auctions;

  let {
    auctionInfo,
    className,
    lastWinners
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const totalIssuance = (0, _reactHooks.useCall)((_api$query$balances = api.query.balances) === null || _api$query$balances === void 0 ? void 0 : _api$query$balances.totalIssuance);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.SummaryBox, {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('auctions'),
        children: (0, _util.formatNumber)(auctionInfo === null || auctionInfo === void 0 ? void 0 : auctionInfo.numAuctions)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('active'),
        children: auctionInfo !== null && auctionInfo !== void 0 && auctionInfo.leasePeriod ? t('yes') : t('no')
      })]
    }), auctionInfo && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
        children: [auctionInfo.leasePeriod && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.CardSummary, {
          label: t('first - last'),
          children: [(0, _util.formatNumber)(auctionInfo.leasePeriod), " - ", (0, _util.formatNumber)(auctionInfo.leasePeriod.add(api.consts.auctions.leasePeriodsPerSlot).isub(_util.BN_ONE))]
        }), totalIssuance && lastWinners && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
          label: t('total'),
          progress: {
            hideValue: true,
            total: totalIssuance,
            value: lastWinners.total,
            withTime: true
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
            value: lastWinners.total,
            withSi: true
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
        children: (auctionInfo === null || auctionInfo === void 0 ? void 0 : auctionInfo.endBlock) && bestNumber && (bestNumber.lt(auctionInfo.endBlock) ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.CardSummary, {
          label: t('end period at'),
          progress: {
            hideGraph: true,
            total: auctionInfo.endBlock,
            value: bestNumber,
            withTime: true
          },
          children: ["#", (0, _util.formatNumber)(auctionInfo.endBlock)]
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
          label: t('ending period'),
          progress: {
            total: (_api$consts$auctions = api.consts.auctions) === null || _api$consts$auctions === void 0 ? void 0 : _api$consts$auctions.endingPeriod,
            value: bestNumber.sub(auctionInfo.endBlock),
            withTime: true
          }
        }))
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Summary);

exports.default = _default;