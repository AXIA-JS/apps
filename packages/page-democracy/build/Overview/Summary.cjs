"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
const optMulti = {
  defaultValue: [undefined, undefined]
};

function Summary({
  referendumCount
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const activeProposals = (0, _reactHooks.useCall)(api.derive.democracy.proposals);
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const [publicPropCount, referendumTotal] = (0, _reactHooks.useCallMulti)([api.query.democracy.publicPropCount, api.query.democracy.referendumCount], optMulti);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.SummaryBox, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('proposals'),
        children: (0, _util.formatNumber)(activeProposals === null || activeProposals === void 0 ? void 0 : activeProposals.length)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('total'),
        children: (0, _util.formatNumber)(publicPropCount)
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('referenda'),
        children: (0, _util.formatNumber)(referendumCount || 0)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('total'),
        children: (0, _util.formatNumber)(referendumTotal || 0)
      })]
    }), bestNumber && /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      className: "media--1100",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('launch period'),
        progress: {
          total: api.consts.democracy.launchPeriod,
          value: bestNumber.mod(api.consts.democracy.launchPeriod).iadd(_util.BN_ONE),
          withTime: true
        }
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Summary);

exports.default = _default;