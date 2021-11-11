"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function WinRanges({
  auctionInfo,
  blockNumber,
  className = '',
  isFirst,
  isLatest,
  value: {
    accountId,
    firstSlot,
    isCrowdloan,
    lastSlot,
    paraId,
    value
  }
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      children: isFirst && /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: isLatest ? t('latest') : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: ["#", (0, _util.formatNumber)(!blockNumber || blockNumber.isZero() ? auctionInfo.endBlock : blockNumber)]
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: (0, _util.formatNumber)(paraId)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "badge",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ParaLink, {
        id: paraId
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
        value: accountId
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "all number",
      children: isCrowdloan ? t('Yes') : t('No')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "all number together",
      children: firstSlot.eq(lastSlot) ? (0, _util.formatNumber)(firstSlot) : `${(0, _util.formatNumber)(firstSlot)} - ${(0, _util.formatNumber)(lastSlot)}`
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: value
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(WinRanges);

exports.default = _default;