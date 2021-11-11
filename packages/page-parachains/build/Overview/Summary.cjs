"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SummarySession = _interopRequireDefault(require("@axia-js/app-explorer/SummarySession"));

var _reactComponents = require("@axia-js/react-components");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Summary({
  leasePeriod,
  parachainCount,
  proposalCount,
  upcomingCount
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.SummaryBox, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [(0, _util.isNumber)(parachainCount) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('parachains'),
        children: (0, _util.formatNumber)(parachainCount)
      }), (0, _util.isNumber)(upcomingCount) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        className: "media--1000",
        label: t('parathreads'),
        children: (0, _util.formatNumber)(upcomingCount)
      }), (0, _util.isNumber)(proposalCount) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        className: "media--1000",
        label: t('proposals'),
        children: (0, _util.formatNumber)(proposalCount)
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      children: leasePeriod && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
          label: t('current lease'),
          children: (0, _util.formatNumber)(leasePeriod.currentPeriod)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
          className: "media--1200",
          label: t('lease period'),
          progress: {
            total: leasePeriod.length,
            value: leasePeriod.progress,
            withTime: true
          }
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('finalized'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BestFinalized, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SummarySession.default, {
        className: "media--1200",
        withEra: false
      })]
    })]
  });
}

var _default = Summary;
exports.default = _default;