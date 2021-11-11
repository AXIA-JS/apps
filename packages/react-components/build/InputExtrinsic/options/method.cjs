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
function createOptions(api, sectionName) {
  const section = api.tx[sectionName];

  if (!section || Object.keys(section).length === 0) {
    return [];
  }

  return Object.keys(section).sort().map(value => {
    const method = section[value];
    const inputs = method.meta.args.map(arg => arg.name.toString()).join(', ');
    return {
      className: 'ui--DropdownLinked-Item',
      key: `${sectionName}_${value}`,
      text: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "ui--DropdownLinked-Item-call",
        children: [value, "(", inputs, ")"]
      }, `${sectionName}_${value}:call`), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--DropdownLinked-Item-text",
        children: (method.meta.docs[0] || value).toString()
      }, `${sectionName}_${value}:text`)],
      value
    };
  });
}