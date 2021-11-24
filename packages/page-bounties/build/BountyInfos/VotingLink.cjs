"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function VotingLink(_ref) {
  let {
    className
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    className: className,
    href: "#/council/motions",
    children: t('Voting')
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(VotingLink).withConfig({
  displayName: "VotingLink",
  componentId: "sc-om5j1f-0"
})(["line-height:0.85rem;font-size:0.7rem;text-decoration:underline;"]));

exports.default = _default;