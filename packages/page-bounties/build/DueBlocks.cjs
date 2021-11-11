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

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function DueBlocks({
  dueBlocks,
  endBlock,
  label
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: dueBlocks.gtn(0) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactQuery.BlockToTime, {
        value: dueBlocks,
        children: ["\xA0(", label, ")"]
      }), "#", (0, _util.formatNumber)(endBlock)]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(DueBlocks);

exports.default = _default;