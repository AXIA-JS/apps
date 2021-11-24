"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function BlockHeader(_ref) {
  let {
    value
  } = _ref;

  if (!value) {
    return null;
  }

  const hashHex = value.hash.toHex();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Link, {
          to: `/explorer/query/${hashHex}`,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Digits, {
            value: (0, _util.formatNumber)(value.number)
          })
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "all hash overflow",
      children: hashHex
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      children: value.authorFromMapping ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
        value: value.authorFromMapping
      }) : value.author && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
        value: value.author
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(BlockHeader);

exports.default = _default;