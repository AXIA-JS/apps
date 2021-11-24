"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactMarkdown = _interopRequireDefault(require("react-markdown"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactHooks = require("@axia-js/react-hooks");

var _Icon = _interopRequireDefault(require("./Icon.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function HelpOverlay(_ref) {
  let {
    className = '',
    md
  } = _ref;
  const [isVisible, toggleVisible] = (0, _reactHooks.useToggle)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--HelpOverlay ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "help-button",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
        icon: "question-circle",
        onClick: toggleVisible
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: `help-slideout ${isVisible ? 'open' : 'closed'}`,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "help-button",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
          icon: "times",
          onClick: toggleVisible
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactMarkdown.default, {
        className: "help-content",
        escapeHtml: false,
        source: md
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(HelpOverlay).withConfig({
  displayName: "HelpOverlay",
  componentId: "sc-lxjnq4-0"
})([".help-button{color:var(--color-text);cursor:pointer;font-size:2rem;padding:0.35rem 1.5rem 0 0;}> .help-button{position:absolute;right:0rem;top:0rem;z-index:10;}.help-slideout{background:var(--bg-page);box-shadow:-6px 0px 20px 0px rgba(0,0,0,0.3);bottom:0;max-width:50rem;overflow-y:scroll;position:fixed;right:-50rem;top:0;transition-duration:.5s;transition-property:all;z-index:225;.help-button{text-align:right;}.help-content{padding:1rem 1.5rem 5rem;}&.open{right:0;}}"]));

exports.default = _default;