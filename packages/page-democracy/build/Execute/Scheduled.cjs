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
function Scheduled(_ref) {
  let {
    bestNumber,
    className = '',
    value: {
      blockNumber,
      call,
      maybeId,
      maybePeriodic
    }
  } = _ref;
  const period = maybePeriodic.unwrapOr(null);
  const name = maybeId.unwrapOr(null);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "all",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CallExpander, {
        value: call
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "start",
      children: name && (name.isAscii ? name.toUtf8() : name.toHex())
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together",
      children: bestNumber && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
          value: blockNumber.sub(bestNumber)
        }), "#", (0, _util.formatNumber)(blockNumber)]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together",
      children: period && (0, _util.formatNumber)(period[0])
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together",
      children: period && (0, _util.formatNumber)(period[1])
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Scheduled);

exports.default = _default;