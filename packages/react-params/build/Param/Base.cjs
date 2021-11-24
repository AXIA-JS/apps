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
function Base(_ref) {
  let {
    children,
    className = '',
    isOuter,
    label,
    size = 'full',
    withLabel
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Bare.default, {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Labelled, {
      className: size,
      isOuter: true,
      label: label,
      withEllipsis: true,
      withLabel: withLabel,
      children: !isOuter && children
    }), isOuter && children]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Base);

exports.default = _default;