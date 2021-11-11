"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
const sizing = ['0.1x', '1x', '2x', '3x', '4x', '5x', '6x'];

function voteLabel({
  conviction
}, isDelegating) {
  return `${sizing[conviction.toNumber()]}${isDelegating ? '/d' : ''} - `;
}

function ReferendumVote({
  vote: {
    accountId,
    balance,
    isDelegating,
    vote
  }
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
    balance: balance,
    labelBalance: voteLabel(vote, isDelegating),
    value: accountId,
    withBalance: true
  });
}

var _default = /*#__PURE__*/_react.default.memo(ReferendumVote);

exports.default = _default;