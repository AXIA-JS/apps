"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Members = _interopRequireDefault(require("./Members.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Overview({
  className = '',
  isMember,
  members,
  prime,
  proposalHashes,
  type
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      isMember: isMember,
      members: members,
      proposalHashes: proposalHashes,
      type: type
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Members.default, {
      members: members,
      prime: prime
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Overview);

exports.default = _default;