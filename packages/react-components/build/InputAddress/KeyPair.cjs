"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _AccountName = _interopRequireDefault(require("../AccountName.cjs"));

var _index = _interopRequireDefault(require("../IdentityIcon/index.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function KeyPair(_ref) {
  let {
    address,
    className = ''
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--KeyPair ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
      className: "icon",
      value: address
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "name",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_AccountName.default, {
        value: address
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "address",
      children: address
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(KeyPair).withConfig({
  displayName: "KeyPair",
  componentId: "sc-1ym7m2c-0"
})(["display:flex;flex-wrap:nowrap;justify-content:space-between;position:relative;white-space:nowrap;> .address{display:inline-block;flex:1;font:var(--font-mono);margin-left:1rem;opacity:0.5;overflow:hidden;text-align:right;text-overflow:ellipsis;}> .icon{position:absolute;top:-5px;left:0;}> .name{display:inline-block;flex:1 0;margin-left:3rem;overflow:hidden;text-overflow:ellipsis;&.uppercase{text-transform:uppercase;}}"]));

exports.default = _default;