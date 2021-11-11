"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _usePopupWindow = require("@axia-js/react-hooks/usePopupWindow");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function PopupWindow({
  children,
  className = '',
  position,
  triggerRef,
  windowRef
}) {
  const {
    renderWindowPosition,
    verticalPosition
  } = (0, _usePopupWindow.usePopupWindow)(windowRef, triggerRef, position);
  return /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `${className}${verticalPosition === 'top' ? ' pointerTop' : ' pointerBottom'}`,
    ref: windowRef,
    style: renderWindowPosition && {
      transform: `translate3d(${renderWindowPosition.x}px, ${renderWindowPosition.y}px, 0)`,
      zIndex: 300
    },
    children: children
  }), document.body);
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(PopupWindow).withConfig({
  displayName: "PopupWindow",
  componentId: "sc-1rcop28-0"
})(["position:absolute;top:0;left:0;z-index:-1;margin:0.7rem 0;padding:0;color:var(--color-text);background-color:var(--bg-menu);border-radius:4px;border:1px solid #d4d4d5;box-shadow:0 2px 4px 0 rgb(34 36 38 / 12%),0 2px 10px 0 rgb(34 36 38 / 15%);&::before{position:absolute;right:50%;top:unset;bottom:-0.45rem;box-shadow:1px 1px 0 0 #bababc;", " ", " content:'';background-color:var(--bg-menu);width:1rem;height:1rem;transform:rotate(45deg);z-index:2;}&.pointerBottom::before{box-shadow:-1px -1px 0 0 #bababc;top:-0.45rem;bottom:unset;}.ui.text.menu .item{color:var(--color-text) !important;text-align:left;&.disabled{opacity:0.3;}}& > *:not(.ui--Menu){margin-left:1rem;margin-right:1rem;}& > *:first-child:not(.ui--Menu){margin-top:1rem;}& > *:last-child:not(.ui--Menu){margin-bottom:1rem;}"], ({
  position
}) => position === 'left' && (0, _styledComponents.css)(["left:unset;right:0.8rem;"]), ({
  position
}) => position === 'right' && (0, _styledComponents.css)(["left:0.8rem;right:unset;"])));

exports.default = _default;