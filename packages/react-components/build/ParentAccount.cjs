"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _AccountName = _interopRequireDefault(require("@axia-js/react-components/AccountName"));

var _index = require("@axia-js/react-components/index");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/page-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ParentAccount(_ref) {
  let {
    address,
    className
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    "data-testid": "parent",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Icon, {
      className: "parent-icon",
      icon: "code-branch"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_AccountName.default, {
      value: address,
      withSidebar: true
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(ParentAccount).withConfig({
  displayName: "ParentAccount",
  componentId: "sc-1xam66h-0"
})(["align-items:center;color:#8B8B8B;font-size:0.75rem;display:flex;& .parent-icon{font-size:0.625rem;margin-right:0.3rem;margin-left:0.15rem;}"]));

exports.default = _default;