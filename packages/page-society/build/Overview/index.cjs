"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Defender = _interopRequireDefault(require("./Defender.cjs"));

var _Members = _interopRequireDefault(require("./Members.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Overview(_ref) {
  let {
    className,
    info,
    isMember,
    mapMembers,
    ownMembers,
    payoutTotal
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      info: info,
      payoutTotal: payoutTotal
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Defender.default, {
      info: info,
      isMember: isMember,
      ownMembers: ownMembers
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Members.default, {
      mapMembers: mapMembers
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Overview).withConfig({
  displayName: "Overview",
  componentId: "sc-161u92j-0"
})([".overviewSection{margin-bottom:1.5rem;}"]));

exports.default = _default;