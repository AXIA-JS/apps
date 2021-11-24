"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = _interopRequireDefault(require("../Button/index.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Header(_ref) {
  let {
    className = '',
    header,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `${className} ui--Modal__Header`,
    children: [header && /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
      children: header
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
      dataTestId: "close-modal",
      icon: "times",
      onClick: onClose
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Header).withConfig({
  displayName: "Header",
  componentId: "sc-3ml43y-0"
})(["display:flex;justify-content:space-between;padding:0.75rem 1.5rem 0;"]));

exports.default = _default;