"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _LabelHelp = _interopRequireDefault(require("./LabelHelp.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Label(_ref) {
  let {
    className = '',
    help,
    label,
    withEllipsis
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
    className: className,
    children: [withEllipsis ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "withEllipsis",
      children: label
    }) : label, help && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LabelHelp.default, {
      help: help
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Label);

exports.default = _default;