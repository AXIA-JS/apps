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

// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Summary({
  approvalCount,
  proposalCount
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const totalProposals = (0, _reactHooks.useCall)(api.query.treasury.proposalCount);
  const {
    burn,
    spendPeriod,
    value
  } = (0, _reactHooks.useTreasury)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.SummaryBox, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('proposals'),
        children: (0, _util.formatNumber)(proposalCount)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('total'),
        children: (0, _util.formatNumber)(totalProposals || 0)
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      className: "media--1200",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('approved'),
        children: (0, _util.formatNumber)(approvalCount)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [value && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('available'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: value,
          withSi: true
        })
      }), burn && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        className: "media--1000",
        label: t('next burn'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: burn,
          withSi: true
        })
      })]
    }), bestNumber && (spendPeriod === null || spendPeriod === void 0 ? void 0 : spendPeriod.gtn(0)) && /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('spend period'),
        progress: {
          total: spendPeriod,
          value: bestNumber.mod(spendPeriod),
          withTime: true
        }
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Summary);

exports.default = _default;