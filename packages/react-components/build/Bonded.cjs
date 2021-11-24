"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactQuery = require("@axia-js/react-query");

var _Balance = require("./Balance.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function BondedDisplay(props) {
  const {
    bonded,
    className = '',
    label,
    params
  } = props;

  if (!params) {
    return null;
  }

  return bonded ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: (0, _Balance.renderProvided)({
      className,
      label,
      value: bonded
    })
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.Bonded, {
    className: `ui--Bonded ${className}`,
    label: label,
    params: params
  });
}

var _default = /*#__PURE__*/_react.default.memo(BondedDisplay);

exports.default = _default;