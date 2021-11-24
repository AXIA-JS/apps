"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Foot(_ref) {
  let {
    className = '',
    footer,
    isEmpty
  } = _ref;

  if (!footer || isEmpty) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("tfoot", {
    className: className,
    children: footer
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Foot).withConfig({
  displayName: "Foot",
  componentId: "sc-5j0bhj-0"
})(["td{color:var(--color-table-foot);font:var(--font-sans);font-weight:var(--font-weight-normal);padding:0.75rem 1rem 0.25rem;text-align:right;vertical-align:baseline;white-space:nowrap;}tr{background:var(--bg-page);}"]));

exports.default = _default;