"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createOptions;

var _react = _interopRequireDefault(require("react"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createOptions(api, rpcs, sectionName) {
  const section = rpcs[sectionName];

  if (!section || Object.keys(api.rpc[sectionName]).length === 0) {
    return [];
  }

  return Object.keys(api.rpc[sectionName]).sort().map(methodName => section[methodName]).filter(ext => !!ext).filter(({
    isSubscription
  }) => !isSubscription).map(({
    description,
    method,
    params
  }) => {
    const inputs = params.map(({
      name
    }) => name).join(', ');
    return {
      className: 'ui--DropdownLinked-Item',
      key: `${sectionName}_${method}`,
      text: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "ui--DropdownLinked-Item-call",
        children: [method, "(", inputs, ")"]
      }, `${sectionName}_${method}:call`), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--DropdownLinked-Item-text",
        children: description || method
      }, `${sectionName}_${method}:text`)],
      value: method
    };
  });
}