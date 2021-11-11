"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _media = _interopRequireDefault(require("./media.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function FilterOverlay({
  children,
  className
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(FilterOverlay).withConfig({
  displayName: "FilterOverlay",
  componentId: "sc-u6nyid-0"
})(["display:none;right:calc(50% - var(--width-half) + 1.5rem);.ui--Labelled label{display:none;}&& .ui--Input{margin:0.29rem 0;}", ";@media (max-width:1750px){right:1.5rem;}"], _media.default.DESKTOP`
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 0rem;

    > div {
      max-width: 35rem !important;
    }

    .ui--Labelled label {
      display: flex;
    }

    .ui.selection.dropdown {
      white-space: nowrap;
    }
  `));

exports.default = _default;