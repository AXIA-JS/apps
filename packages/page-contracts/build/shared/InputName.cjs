"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function InputName(_ref) {
  let {
    className,
    isBusy,
    isContract,
    isError,
    onChange,
    onEnter,
    value = ''
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
    className: className,
    help: t(isContract ? 'A name for the deployed contract to help users distinguish. Only used for display purposes.' : 'A name for this WASM code to help users distinguish. Only used for display purposes.'),
    isDisabled: isBusy,
    isError: isError,
    label: t(isContract ? 'contract name' : 'code bundle name'),
    onChange: onChange,
    onEnter: onEnter,
    value: value
  });
}

var _default = /*#__PURE__*/_react.default.memo(InputName);

exports.default = _default;