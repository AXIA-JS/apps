"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ExpandButton({
  className = '',
  expanded,
  onClick
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `ui--ExpandButton ${className}`,
    "data-testid": "row-toggle",
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
      icon: expanded ? 'caret-up' : 'caret-down'
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(ExpandButton).withConfig({
  displayName: "ExpandButton",
  componentId: "sc-198yrgt-0"
})(["display:flex;align-items:center;justify-content:center;width:1.7rem;height:1.7rem;border:1px solid var(--border-table);border-radius:4px;cursor:pointer;"]));

exports.default = _default;