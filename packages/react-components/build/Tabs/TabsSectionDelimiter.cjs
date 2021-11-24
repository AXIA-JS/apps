"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2020 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function TabsSectionDelimiter(_ref) {
  let {
    className = ''
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
      fill: "none",
      height: "47",
      viewBox: "0 0 17 65",
      width: "17",
      xmlns: "http://www.w3.org/2000/svg",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        className: "highlight--stroke",
        d: "M1 1L16 32.5L1 64",
        stroke: "#D1D1D1"
      })
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(TabsSectionDelimiter).withConfig({
  displayName: "TabsSectionDelimiter",
  componentId: "sc-6lxs92-0"
})(["height:100%;width:auto;"]));

exports.default = _default;