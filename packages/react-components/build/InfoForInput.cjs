"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Labelled = _interopRequireDefault(require("./Labelled.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function InfoForInput(_ref) {
  let {
    children,
    className = '',
    type = 'info'
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Labelled.default, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: `${className} ${type}`,
      children: children
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(InfoForInput).withConfig({
  displayName: "InfoForInput",
  componentId: "sc-fxkf2p-0"
})(["background:white;border-radius:0 0 0.25rem 0.25rem;margin:-0.5rem 0 0.25rem;padding:1.25rem 1.5rem 1rem;&.error{background:#db2828;color:#eee;}&.warning{background:#ffffe0;}> ul{margin:0;padding:0;}"]));

exports.default = _default;