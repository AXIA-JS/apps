"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Query = _interopRequireDefault(require("./Query.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Queries(_ref) {
  let {
    onRemove,
    value
  } = _ref;

  if (!value || !value.length) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
    className: "storage--Queries",
    children: value.map(query => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Query.default, {
      onRemove: onRemove,
      value: query
    }, query.id))
  });
}

var _default = /*#__PURE__*/_react.default.memo(Queries);

exports.default = _default;