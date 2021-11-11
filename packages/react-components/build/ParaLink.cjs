"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactHooks = require("@axia-js/react-hooks");

var _ChainImg = _interopRequireDefault(require("./ChainImg.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ParaLink({
  className,
  id
}) {
  const endpoints = (0, _reactHooks.useParaEndpoints)(id);

  if (!endpoints.length) {
    return null;
  }

  const {
    info,
    text,
    value
  } = endpoints[endpoints.length - 1];
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ChainImg.default, {
      isInline: true,
      logo: info || 'empty',
      withoutHl: true
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
      className: "chainAlign",
      href: `${window.location.origin}${window.location.pathname}?rpc=${encodeURIComponent(value)}`,
      children: text
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(ParaLink).withConfig({
  displayName: "ParaLink",
  componentId: "sc-sac1kg-0"
})(["vertical-align:middle;white-space:nowrap;a.chainAlign{display:inline-block;height:24px;line-height:24px;max-width:10em;overflow:hidden;text-overflow:ellipsis;vertical-align:middle;}"]));

exports.default = _default;