"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("@axia-js/react-components/index");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Flag({
  className = '',
  color,
  label
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Tag, {
    className: `${className} ${color === 'theme' ? ' highlight--color-bg highlight--bg' : ''}`,
    color: color,
    isFlag: true,
    label: label,
    size: "tiny"
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Flag).withConfig({
  displayName: "Flag",
  componentId: "sc-gk8ai-0"
})(["border-radius:0 0.25rem 0.25rem 0;padding:0.5833em 1.25em 0.5833em 1.5em;font-size:0.78571429rem;line-height:1;color:#fff !important;&.darkTheme{:after{background-color:var(--bg-tabs);}}&:after{background-color:#fff;border-radius:500rem;content:'';left:-0.25em;margin-top:-0.25em;position:absolute;width:0.5em;height:0.5em;top:50%;}&:before{border-radius:0.2rem 0 0.1rem 0;background-color:inherit;background-image:none;content:'';right:100%;width:1.5em;height:1.5em;position:absolute;transform:translateY(-50%) translateX(50%) rotate(-45deg);top:50%;transition:none;}"]));

exports.default = _default;