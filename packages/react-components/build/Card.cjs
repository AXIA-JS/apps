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
function Card(_ref) {
  let {
    children,
    className = '',
    isError,
    isSuccess,
    withBottomMargin
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("article", {
    className: `ui--Card ${className}${isError && !isSuccess ? ' error' : ''}${!isError && isSuccess ? ' success' : ''}${withBottomMargin ? ' withBottomMargin' : ''}`,
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Card).withConfig({
  displayName: "Card",
  componentId: "sc-1fv2lj2-0"
})(["position:relative;flex:1 1;min-width:24%;justify-content:space-around;label{opacity:0.42;}i.help.circle.icon,.ui.button.mini,.ui.button.tiny,.addTags{visibility:hidden;}.ui--AddressSummary-buttons{text-align:right;margin-bottom:2em;button{margin-left:0.2em;}}&:hover{i.help.circle.icon,.ui.button.mini,.ui.button.tiny,.addTags{visibility:visible;}label{opacity:1;}}&.error{background:rgba(255,0,0,0.05);&,h1,h2,h3,h4,h5,h6,p{color:rgba(156,0,0) !important;}}&.success{border:1px solid rgb(168,255,136);background:rgba(0,255,0,0.05);&,h1,h2,h3,h4,h5,h6,p{color:rgba(34,125,0) !important;}}&.withBottomMargin{margin-bottom:1.5rem;}"]));

exports.default = _default;