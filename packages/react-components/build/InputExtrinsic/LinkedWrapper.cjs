"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Labelled = _interopRequireDefault(require("../Labelled.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function LinkedWrapper({
  children,
  className = '',
  help,
  label,
  withLabel
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Labelled.default, {
      help: help,
      label: label,
      withLabel: withLabel,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--DropdownLinked ui--row",
        children: children
      })
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(LinkedWrapper).withConfig({
  displayName: "LinkedWrapper",
  componentId: "sc-eremyh-0"
})([".ui--DropdownLinked-Items{.text{box-sizing:border-box;display:flex !important;flex-wrap:nowrap;justify-content:space-between;overflow:hidden;position:relative;width:100%;white-space:nowrap;}> .text{padding-left:1em;}}.ui--DropdownLinked-Item-text,.ui--DropdownLinked-Item-call{display:inline-block;}.ui--DropdownLinked-Item-call{flex:1 0;margin-right:1rem;text-align:left;text-overflow:ellipsis;}.ui--DropdownLinked-Item-text{flex:1;opacity:0.5;overflow:hidden;text-align:right;text-overflow:ellipsis;}"]));

exports.default = _default;