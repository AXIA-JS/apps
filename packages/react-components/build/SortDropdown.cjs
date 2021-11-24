"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("./index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SortDropdown(_ref) {
  let {
    className = '',
    defaultValue,
    label,
    onChange,
    onClick,
    options,
    sortDirection
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--Sort ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Dropdown, {
      defaultValue: defaultValue,
      label: label,
      onChange: onChange,
      options: options
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
      onClick: onClick,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Icon, {
        className: `arrow up${sortDirection === 'ascending' ? ' isActive' : ''}`,
        color: "gray",
        icon: "sort-up"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Icon, {
        className: `arrow down${sortDirection === 'descending' ? ' isActive' : ''}`,
        color: "gray",
        icon: "sort-down"
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(SortDropdown).withConfig({
  displayName: "SortDropdown",
  componentId: "sc-f5j6pi-0"
})(["position:relative;display:flex;flex-direction:row;flex-wrap:nowrap;&& .ui--Labelled.ui--Dropdown{padding:0;label{left:1.55rem;z-index:115;}.ui.selection.dropdown{margin:0;min-width:7.857rem;z-index:110;border-width:1px 0 1px 1px;border-style:solid;border-color:var(--border-input);border-radius:4px 0 0 4px;&.active{position:absolute;min-width:10.714rem;z-index:120;border-width:1px;border-radius:4px;top:0;left:0;}.visible.menu{border-color:var(--border-input);}}}button{position:relative;width:2.857rem;height:3.893rem;background-color:var(--bg-input);border-width:1px 1px 1px 0;border-style:solid;border-color:var(--border-input);border-radius:0 4px 4px 0;&:hover{cursor:pointer;}.arrow.down{position:absolute;top:calc(50% - 0.5rem);left:calc(50% - 0.313rem);}}&::after{content:'';position:absolute;left:7.857rem;top:10%;width:1px;height:80%;background-color:var(--border-input);z-index:99;}button:hover,.ui--Labelled.ui--Dropdown:hover{&::after{content:'';position:absolute;top:0;height:100%;width:1px;z-index:100;}}button:hover::after{left:0;}.ui--Labelled.ui--Dropdown:hover::after{left:7.857rem;}"]));

exports.default = _default;