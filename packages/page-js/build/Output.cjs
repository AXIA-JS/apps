"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _util = require("@axia-js/util");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0
const format = value => {
  if ((0, _util.isError)(value)) {
    return value.stack ? value.stack : value.toString();
  } else if ((0, _util.isUndefined)(value)) {
    return 'undefined';
  } else if ((0, _util.isNull)(value)) {
    return 'null';
  } else if (Array.isArray(value)) {
    return `[${value.map(value => format(value)).join(', ')}]`;
  } else if (value instanceof Map) {
    return `{${[...value.entries()].map(([key, value]) => key + ': ' + format(value)).join(', ')}}`;
  }

  return value.toString();
};

const renderEntry = ({
  args,
  type
}, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
  className: `js--Log ${type}`,
  children: args.map(arg => format(arg)).join(' ')
}, index);

function Output({
  children,
  className = '',
  logs
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("article", {
    className: `container ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "logs-wrapper",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "logs-container",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("pre", {
          className: "logs-content",
          children: logs.map(renderEntry)
        })
      })
    }), children]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Output).withConfig({
  displayName: "Output",
  componentId: "sc-1m1tx1p-0"
})(["background-color:#4e4e4e;color:#ffffff;display:flex;flex-direction:column;flex-grow:1;font:var(--font-mono);font-variant-ligatures:common-ligatures;line-height:18px;padding:50px 10px 10px;position:relative;width:40%;.logs-wrapper{display:flex;flex:1;min-height:0;}.logs-container{flex:1;overflow:auto;}.logs-content{height:auto;}.js--Log{animation:fadein 0.2s;margin:0 0 5px 0;word-break:break-all;&.error{color:#f88;}}"]));

exports.default = _default;