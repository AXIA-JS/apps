"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = _interopRequireDefault(require("../Button/index.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Actions({
  children,
  className = ''
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default.Group, {
      children: children
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Actions).withConfig({
  displayName: "Actions",
  componentId: "sc-1stqdlr-0"
})(["background-color:var(--bg-input);border-radius:0 0 4px 4px;.ui--Button-Group{margin:1rem 1rem;}"]));

exports.default = _default;