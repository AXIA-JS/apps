"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Queue(_ref) {
  let {
    className,
    value: {
      balance,
      index,
      numItems
    }
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: (0, _util.formatNumber)(index)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number all",
      children: (0, _util.formatNumber)(numItems)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "all",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: balance
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Queue);

exports.default = _default;