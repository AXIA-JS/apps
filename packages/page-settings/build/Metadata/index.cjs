"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Metadata;

var _react = _interopRequireDefault(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _useChainInfo = _interopRequireDefault(require("../useChainInfo.cjs"));

var _Extensions = _interopRequireDefault(require("./Extensions.cjs"));

var _NetworkSpecs = _interopRequireDefault(require("./NetworkSpecs.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Metadata() {
  const {
    isDevelopment
  } = (0, _reactHooks.useApi)();
  const chainInfo = (0, _useChainInfo.default)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [!isDevelopment && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Extensions.default, {
        chainInfo: chainInfo
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_NetworkSpecs.default, {
      chainInfo: chainInfo
    })]
  });
}