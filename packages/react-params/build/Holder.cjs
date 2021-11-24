"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Holder(_ref) {
  let {
    children,
    className = '',
    withBorder,
    withPadding
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `ui--Params ${className} ${withBorder ? 'withBorder' : 'withoutBorder'} ${withPadding ? 'withPadding' : ''}`,
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Holder).withConfig({
  displayName: "Holder",
  componentId: "sc-1758h70-0"
})(["&.withBorder{border-left:0.25rem solid #f2f2f2;}&.withoutBorder{margin-left:-1.75rem;padding:0;}&.withPadding{padding-left:4rem;}.ui--Param .ui--Labelled label{text-transform:none !important;font:var(--font-mono);}.ui--row{flex-wrap:wrap;}.ui--Param-Address{font:var(--font-mono);}.ui--Params-Content{box-sizing:border-box;padding:0 0 0 1.75rem;}.ui--Param-text{display:inline-block;font-size:1rem;line-height:1.714rem;overflow:hidden;text-overflow:ellipsis;}.ui--Param-text .icon{margin-right:0.5rem !important;}.ui--Param-text *{vertical-align:middle;}.ui--Param-text.nowrap{white-space:nowrap;}.ui--Param-text.name{color:rgba(0,0,0,.6);font-style:italic;}.ui--Param-text + .ui--Param-text{margin-left:0.5rem;}.ui--Param-Vector-buttons{text-align:right;}.ui--Param-composite{position:relative;.ui--Param-overlay{position:absolute;top:0.5rem;right:3.5rem;}}"]));

exports.default = _default;