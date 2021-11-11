"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const Wrapper = _styledComponents.default.div.withConfig({
  displayName: "Base__Wrapper",
  componentId: "sc-atk4x1-0"
})(["position:relative;display:inline-block;padding:1em 1em 0;height:15vw;width:15vw;"]);

function BaseChart({
  children,
  className = ''
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Wrapper, {
    className: `ui--Chart ${className}`,
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo(BaseChart);

exports.default = _default;