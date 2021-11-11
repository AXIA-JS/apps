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

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Voters({
  balance,
  voters
}) {
  if (!balance || !voters || !voters.length) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "all number"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "number"
      })]
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "all expand",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
        summary: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: balance
        }),
        children: voters.map(who => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
          value: who,
          withLockedVote: true
        }, who.toString()))
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: (0, _util.formatNumber)(voters.length)
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Voters);

exports.default = _default;