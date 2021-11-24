"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _Extrinsic = _interopRequireDefault(require("./Extrinsic.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Call(_ref) {
  let {
    className = '',
    isDisabled,
    isError,
    label,
    onChange,
    onEnter,
    onEscape,
    withLabel
  } = _ref;
  const {
    api,
    apiDefaultTx
  } = (0, _reactHooks.useApi)();

  const defaultValue = (() => {
    try {
      return api.tx.balances.transfer;
    } catch (error) {
      return apiDefaultTx;
    }
  })();

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Extrinsic.default, {
    className: className,
    defaultValue: defaultValue,
    isDisabled: isDisabled,
    isError: isError,
    isPrivate: false,
    label: label,
    onChange: onChange,
    onEnter: onEnter,
    onEscape: onEscape,
    withLabel: withLabel
  });
}

var _default = /*#__PURE__*/_react.default.memo(Call);

exports.default = _default;