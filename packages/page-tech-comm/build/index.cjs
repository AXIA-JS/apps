"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "useCounter", {
  enumerable: true,
  get: function () {
    return _useCounter.default;
  }
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _App = _interopRequireDefault(require("./App.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

var _useCounter = _interopRequireDefault(require("./useCounter.cjs"));

// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
function TechComm({
  basePath,
  className
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {
    basePath: basePath,
    className: className,
    type: "technicalCommittee"
  });
}

var _default = /*#__PURE__*/_react.default.memo(TechComm);

exports.default = _default;