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
function ButtonGroup(_ref) {
  let {
    children,
    className = '',
    isCentered
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `ui--Button-Group${isCentered ? ' isCentered' : ''} ${className}`,
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(ButtonGroup).withConfig({
  displayName: "Group",
  componentId: "sc-1cq2il0-0"
})(["margin:1rem 0;text-align:right;&.isCentered{margin-bottom:0.5rem;text-align:center;}&+.ui--Table{margin-top:1.5rem;}.ui--Button{margin:0 0.25rem;}.ui--CopyButton{display:inline-block;}"]));

exports.default = _default;