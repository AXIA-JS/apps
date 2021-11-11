"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Summary({
  bestNumber,
  className = '',
  electionsInfo,
  hasElections
}) {
  const {
    t
  } = (0, _translate.useTranslation)();

  if (!electionsInfo) {
    return null;
  }

  const {
    candidateCount,
    desiredRunnersUp,
    desiredSeats,
    members,
    runnersUp,
    termDuration,
    voteCount
  } = electionsInfo;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.SummaryBox, {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.CardSummary, {
        label: t('seats'),
        children: [(0, _util.formatNumber)(members.length), desiredSeats && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: ["\xA0/\xA0", (0, _util.formatNumber)(desiredSeats)]
        })]
      }), hasElections && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.CardSummary, {
          label: t('runners up'),
          children: [(0, _util.formatNumber)(runnersUp.length), desiredRunnersUp && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: ["\xA0/\xA0", (0, _util.formatNumber)(desiredRunnersUp)]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
          label: t('candidates'),
          children: (0, _util.formatNumber)(candidateCount)
        })]
      })]
    }), voteCount && /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.CardSummary, {
        label: t('voting round'),
        children: ["#", (0, _util.formatNumber)(voteCount)]
      })
    }), bestNumber && termDuration && termDuration.gt(_util.BN_ZERO) && /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('term progress'),
        progress: {
          total: termDuration,
          value: bestNumber.mod(termDuration),
          withTime: true
        }
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Summary);

exports.default = _default;