"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("@axia-js/react-components/index");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Filter(_ref) {
  let {
    className = '',
    filterOn,
    label,
    setFilter
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Input, {
      autoFocus: true,
      isFull: true,
      label: label,
      onChange: setFilter,
      value: filterOn
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Filter).withConfig({
  displayName: "FilterInput",
  componentId: "sc-2iyz2s-0"
})(["width:29.5rem;:not(:only-child){margin-left:1.5rem;}.ui--Input{margin:0;height:3.893rem;}"]));

exports.default = _default;