"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = _interopRequireDefault(require("./Button/index.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Sidebar({
  button,
  children,
  className = '',
  dataTestId = '',
  onClose,
  sidebarRef
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--Sidebar ${className}`,
    "data-testid": dataTestId,
    ref: sidebarRef,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.default.Group, {
      className: "ui--Sidebar-buttons",
      children: [button, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
        dataTestId: "close-sidebar-button",
        icon: "times",
        isBasic: true,
        isCircular: true,
        onClick: onClose
      })]
    }), children]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Sidebar).withConfig({
  displayName: "Sidebar",
  componentId: "sc-crt1kg-0"
})(({
  offset = 0,
  position
}) => `
  background: var(--bg-page);
  bottom: 0;
  box-shadow: ${position === 'right' ? '-6px' : '6px'} 0px 20px 0px rgba(0, 0, 0, 0.3);
  margin-left: -0.125rem;
  max-width: 24rem;
  min-width: 24rem;
  position: fixed;
  padding: 1rem;
  overflow-y: auto;
  top: 0;
  z-index: 999;
  ${position}: ${offset};

  .ui--Sidebar-buttons {
    margin: 0;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
  }
`));

exports.default = _default;