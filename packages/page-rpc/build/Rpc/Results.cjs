"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _valueToText = _interopRequireDefault(require("@axia-js/react-params/valueToText"));

var _util = require("@axia-js/util");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-rpc authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Results({
  queue = []
}) {
  const filtered = queue.filter(({
    error,
    result
  }) => !(0, _util.isUndefined)(error) || !(0, _util.isUndefined)(result)).reverse();

  if (!filtered.length) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
    className: "rpc--Results",
    children: filtered.map(({
      error,
      id,
      result,
      rpc: {
        method,
        section
      }
    }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Output, {
      isError: !!error,
      label: `${id}: ${section}.${method}`,
      value: error ? error.message : /*#__PURE__*/(0, _jsxRuntime.jsx)("pre", {
        children: (0, _valueToText.default)('', result, false)
      })
    }, id))
  });
}

var _default = /*#__PURE__*/_react.default.memo(Results);

exports.default = _default;