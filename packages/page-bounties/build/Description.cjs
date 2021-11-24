"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Description(_ref) {
  let {
    className = '',
    dataTestId = '',
    description
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    "data-testid": dataTestId,
    children: description
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Description).withConfig({
  displayName: "Description",
  componentId: "sc-atvmm3-0"
})(["margin-top:0.28rem;font-size:0.7rem;line-height:0.85rem;color:var(--color-label);"]));

exports.default = _default;