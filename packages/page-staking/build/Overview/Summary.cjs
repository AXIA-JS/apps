"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _SummarySession = _interopRequireDefault(require("@axia-js/app-explorer/SummarySession"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Summary({
  className = '',
  isVisible,
  stakingOverview,
  targets: {
    counterForNominators,
    inflation: {
      idealStake,
      inflation,
      stakedFraction
    },
    nominators,
    waitingIds
  }
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.SummaryBox, {
    className: `${className}${!isVisible ? ' staking--hidden' : ''}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('validators'),
        children: stakingOverview ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [(0, _util.formatNumber)(stakingOverview.validators.length), "\xA0/\xA0", (0, _util.formatNumber)(stakingOverview.validatorCount)]
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Spinner, {
          noLabel: true
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        className: "media--900",
        label: t('waiting'),
        children: waitingIds ? (0, _util.formatNumber)(waitingIds.length) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Spinner, {
          noLabel: true
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        className: "media--1000",
        label: counterForNominators ? t('active / nominators') : t('nominators'),
        children: nominators ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [(0, _util.formatNumber)(nominators.length), counterForNominators && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: ["\xA0/\xA0", (0, _util.formatNumber)(counterForNominators)]
          })]
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Spinner, {
          noLabel: true
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [idealStake > 0 && Number.isFinite(idealStake) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        className: "media--1400",
        label: t('ideal staked'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [(idealStake * 100).toFixed(1), "%"]
        })
      }), stakedFraction > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        className: "media--1300",
        label: t('staked'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [(stakedFraction * 100).toFixed(1), "%"]
        })
      }), inflation > 0 && Number.isFinite(inflation) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        className: "media--1200",
        label: t('inflation'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [inflation.toFixed(1), "%"]
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SummarySession.default, {})
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Summary).withConfig({
  displayName: "Summary",
  componentId: "sc-7ige7d-0"
})([".validator--Account-block-icon{display:inline-block;margin-right:0.75rem;margin-top:-0.25rem;vertical-align:middle;}.validator--Summary-authors{.validator--Account-block-icon+.validator--Account-block-icon{margin-left:-1.5rem;}}"]));

exports.default = _default;