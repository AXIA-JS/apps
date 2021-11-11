"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Badge = _interopRequireDefault(require("../Badge.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Tab({
  basePath,
  className = '',
  count,
  hasParams,
  index,
  isExact,
  isRoot,
  name,
  text
}) {
  const to = isRoot ? basePath : `${basePath}/${name}`; // only do exact matching when not the fallback (first position tab),
  // params are problematic for dynamic hidden such as app-accounts

  const tabIsExact = isExact || !hasParams || index === 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.NavLink, {
    activeClassName: "tabLinkActive",
    className: `ui--Tab ${className}`,
    exact: tabIsExact,
    strict: tabIsExact,
    to: to,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "tabLinkText",
      children: text
    }), !!count && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Badge.default, {
      className: "tabCounter",
      color: "counter",
      info: count
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Tab).withConfig({
  displayName: "Tab",
  componentId: "sc-1221dbm-0"
})(["position:relative;display:flex;align-items:center;color:#8B8B8B;padding:0 1.5rem;height:100%;font-size:1rem;font-weight:400;&:hover{color:#8B8B8B;.tabLinkText::after{background-color:#8B8B8B;}}&:hover .tabLinkText::after,&.tabLinkActive .tabLinkText::after{content:'';position:absolute;width:3.14rem;height:2px;bottom:-2px;left:50%;transform:translateX(-50%);}&.tabLinkActive{color:var(--color-text) !important;font-weight:400;&:hover{cursor:default;}}.tabLinkText{position:relative;height:100%;display:flex;align-items:center;}.tabCounter{margin:-1rem 0 -1rem 0.75rem;}.tabIcon{margin-left:0.75rem;}"]));

exports.default = _default;