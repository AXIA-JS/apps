"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Dropdown = _interopRequireDefault(require("../Dropdown.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SelectSection({
  className = '',
  defaultValue,
  isError,
  onChange,
  options,
  value: {
    section
  }
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Dropdown.default, {
    className: `ui--DropdownLinked-Sections ${className}`,
    defaultValue: defaultValue,
    isError: isError,
    onChange: onChange,
    options: options,
    value: section,
    withLabel: false
  });
}

var _default = /*#__PURE__*/_react.default.memo(SelectSection);

exports.default = _default;