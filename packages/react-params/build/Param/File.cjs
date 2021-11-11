"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _Bare = _interopRequireDefault(require("./Bare.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function File({
  className = '',
  isDisabled,
  isError = false,
  label,
  onChange,
  placeholder,
  withLabel
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Bare.default, {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputFile, {
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      onChange: onChange,
      placeholder: placeholder,
      withEllipsis: true,
      withLabel: withLabel
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(File);

exports.default = _default;