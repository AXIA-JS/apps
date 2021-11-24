"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _DispatchQueue = _interopRequireDefault(require("./DispatchQueue.cjs"));

var _Scheduler = _interopRequireDefault(require("./Scheduler.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Execute(_ref) {
  let {
    className
  } = _ref;
  const {
    api
  } = (0, _reactHooks.useApi)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DispatchQueue.default, {}), api.query.scheduler && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Scheduler.default, {})]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Execute);

exports.default = _default;