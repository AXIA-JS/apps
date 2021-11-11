"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
function BestHash({
  className = '',
  label
}) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const newHead = (0, _reactHooks.useCall)(api.rpc.chain.subscribeNewHeads);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [label || '', newHead === null || newHead === void 0 ? void 0 : newHead.hash.toHex()]
  });
}

var _default = /*#__PURE__*/_react.default.memo(BestHash);

exports.default = _default;