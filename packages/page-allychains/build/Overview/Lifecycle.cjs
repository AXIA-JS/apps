"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactQuery = require("@axia-js/react-query");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Lifecycle(_ref) {
  let {
    lifecycle,
    nextAction
  } = _ref;
  return lifecycle && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [lifecycle.toString(), nextAction && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.SessionToTime, {
      value: nextAction.sessionIndex
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Lifecycle);

exports.default = _default;