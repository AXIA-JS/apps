"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _FormatBalance = _interopRequireDefault(require("./FormatBalance.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
function LockedVote({
  children,
  className = '',
  label,
  params
}) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const info = (0, _reactHooks.useCall)(api.derive.council.votesOf, [params]);

  if (!(info !== null && info !== void 0 && info.stake.gtn(0))) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormatBalance.default, {
    className: className,
    label: label,
    value: info === null || info === void 0 ? void 0 : info.stake,
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo(LockedVote);

exports.default = _default;