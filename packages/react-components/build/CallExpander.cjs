"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Call = _interopRequireDefault(require("./Call.cjs"));

var _Expander = _interopRequireDefault(require("./Expander.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function CallExpander(_ref) {
  let {
    children,
    className = '',
    labelHash,
    value,
    withHash
  } = _ref;
  const {
    meta,
    method,
    section
  } = value.registry.findMetaCall(value.callIndex);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `ui--CallExpander ${className}`,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Expander.default, {
      summaryHead: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [section, ".", method]
      }),
      summaryMeta: meta,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Call.default, {
        labelHash: labelHash,
        value: value,
        withHash: withHash
      }), children]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(CallExpander);

exports.default = _default;