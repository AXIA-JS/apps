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

var _SummarySession = _interopRequireDefault(require("./SummarySession.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Summary(_ref) {
  let {
    eventCount
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.SummaryBox, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [api.query.timestamp && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
          label: t('last block'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.TimeNow, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
          className: "media--800",
          label: t('target'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
            value: _util.BN_ONE
          })
        })]
      }), api.query.balances && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        className: "media--800",
        label: t('total issuance'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.TotalIssuance, {})
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      className: "media--1200",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SummarySession.default, {
        withEra: false
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        className: "media--1000",
        label: t('last events'),
        children: (0, _util.formatNumber)(eventCount)
      }), api.query.grandpa && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('finalized'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BestFinalized, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('best'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BestNumber, {})
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Summary);

exports.default = _default;