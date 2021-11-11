"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Spinner = _interopRequireDefault(require("./Spinner.png"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
// prefetch
const img = new Image();
img.src = _Spinner.default;

function Spinner({
  className = '',
  label,
  noLabel,
  variant = 'app'
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `${className} ui--Spinner variant-${variant}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
      className: variant === 'push' ? '' : 'highlight--bg highlight--border',
      src: _Spinner.default
    }), !noLabel && variant.startsWith('app') && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "text",
      children: label || t('Retrieving data')
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Spinner).withConfig({
  displayName: "Spinner",
  componentId: "sc-169snes-0"
})(["display:block;line-height:1rem;margin:0 auto;text-align:center;&.variant-appPadded{margin-top:0.5rem;}&.variant-cover{bottom:0;left:0;position:absolute;right:0;img{border:1 px solid white;margin:0 auto;}}img{border:1px solid transparent;border-radius:10rem;}.text{color:inherit !important;margin:0.25rem auto 1.5rem auto;opacity:0.6;div+div{margin-top:0.25rem;}}"]));

exports.default = _default;