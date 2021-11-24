"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
function VotesExpander(_ref) {
  let {
    label,
    votes
  } = _ref;

  if (votes.length === 0) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
    summary: `${label} (${votes.length})`,
    children: votes.map(_ref2 => {
      let [who] = _ref2;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
        value: who
      }, who.toString());
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(VotesExpander);

exports.default = _default;