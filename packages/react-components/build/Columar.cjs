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
function Column({
  children,
  className = ''
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `ui--Column ${className}`,
    children: children
  });
}

function Columar({
  children,
  className = '',
  is60
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `ui--Columnar ${is60 ? 'is60' : 'is50'} ${className}`,
    children: children
  });
}

const ColumarStyled = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Columar).withConfig({
  displayName: "Columar__ColumarStyled",
  componentId: "sc-1gd3n7g-0"
})(["display:flex;flex-wrap:wrap;&.is50{.ui--Column{@media (min-width:1025px){max-width:50%;min-width:50%;}}}&.is60{.ui--Column:first-child{@media (min-width:1025px){max-width:60%;min-width:60%;}}.ui--Column:last-child{@media (min-width:1025px){max-width:40%;min-width:40%;}}}"]));

ColumarStyled.Column = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Column).withConfig({
  displayName: "Columar__Column",
  componentId: "sc-1gd3n7g-1"
})(["box-sizing:border-box;max-width:100%;flex:1 1;margin:0;padding:0 0.75rem;&:first-child{padding-left:0;}&:last-child{padding-right:0;}@media (min-width:1025px){max-width:50%;min-width:50%;}"]));
var _default = ColumarStyled;
exports.default = _default;