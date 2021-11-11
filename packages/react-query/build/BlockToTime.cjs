"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactHooks = require("@axia-js/react-hooks");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
function BlockToTime({
  api,
  children,
  className = '',
  isInline,
  label,
  value
}) {
  const [, text] = (0, _reactHooks.useBlockTime)(value, api);

  if (!value || value.isZero()) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `${className}${isInline ? ' isInline' : ''}`,
    children: [label || '', text.split(' ').map((v, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: index % 2 ? 'timeUnits' : undefined,
      children: v
    }, index)), children]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(BlockToTime).withConfig({
  displayName: "BlockToTime",
  componentId: "sc-b38c7s-0"
})(["&.isInline{display:inline-block;}span+span{padding-left:0.25em;}span.timeUnits{font-size:0.825em;}"]));

exports.default = _default;