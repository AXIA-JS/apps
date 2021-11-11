"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Actions = _interopRequireDefault(require("./Actions.cjs"));

var _Proposals = _interopRequireDefault(require("./Proposals.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ProposalsTab({
  className,
  proposals
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Actions.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Proposals.default, {
      proposals: proposals
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(ProposalsTab);

exports.default = _default;