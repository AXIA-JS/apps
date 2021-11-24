"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactHooks = require("@axia-js/react-hooks");

var _Icon = _interopRequireDefault(require("./Icon.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Inset(_ref) {
  let {
    children,
    className = '',
    header,
    href,
    isCollapsible,
    isError,
    isSuccess,
    withBottomMargin,
    withTopMargin
  } = _ref;
  const history = (0, _reactRouterDom.useHistory)();
  const [isCollapsed, toggleCollapsed] = (0, _reactHooks.useToggle)();

  const _onClick = (0, _react.useCallback)(() => {
    href && history.push(href);
  }, [history, href]);

  if (!children) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--Inset ${href ? ' as-link' : ''}${isCollapsible ? ' collapsible' : ''}${isError && !isSuccess ? ' error' : ''}${!isError && isSuccess ? ' success' : ''}${withBottomMargin ? ' bottom-margin' : ''}${withTopMargin ? ' top-margin' : ''} ${className}`,
    children: [isCollapsible && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "header",
      onClick: toggleCollapsed,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
        children: header
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
        className: isCollapsed ? 'collapsed' : '',
        icon: "angle-up"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: `children${isCollapsible && isCollapsed ? ' collapsed' : ''}`,
      onClick: _onClick,
      children: children
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Inset).withConfig({
  displayName: "Inset",
  componentId: "sc-byyc6d-0"
})(["&{box-shadow:0 3px 3px rgba(0,0,0,.2);position:relative;background:#fefefe;padding:1rem;transition:all 0.2s;display:flex;flex-direction:column;&.bottom-margin{margin-bottom:2rem;}&.top-margin{margin-top:2rem;}&.error{background:rgba(255,0,0,0.05);&,h1,h2,h3,h4,h5,h6,p{color:rgba(156,0,0) !important;}}&.success{border:1px solid rgb(168,255,136);background:rgba(0,255,0,0.05);&,h1,h2,h3,h4,h5,h6,p{color:rgba(34,125,0) !important;}}.header{cursor:pointer;height:2rem;width:100%;h3{line-height:2rem;margin-bottom:0;}.icon{height:4rem;width:4rem;font-size:2rem;color:rgba(0,0,0,0.35);position:absolute;right:0;top:0;line-height:4rem;transition:all 0.2s;transform-origin:center center;&.collapsed{transform:rotate(180deg);}}}.children{&.collapsed{display:none;}}&.as-link{cursor:pointer;&:hover{box-shadow:0 5px 5px rgba(0,0,0,.2);transform:translateY(-2px);}}}"]));

exports.default = _default;