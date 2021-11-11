"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderProvided = renderProvided;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function renderProvided({
  className = '',
  label,
  value
}) {
  let others;

  if (Array.isArray(value)) {
    const totals = value.filter((_, index) => index !== 0);
    const total = totals.reduce((total, value) => total.add(value), _util.BN_ZERO).gtn(0);

    if (total) {
      others = totals.map((balance, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: balance
      }, index));
    }
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
    className: `ui--Balance ${className}`,
    label: label,
    value: Array.isArray(value) ? value[0] : value,
    children: others && /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: ["\xA0(+", others, ")"]
    })
  });
}

function BalanceDisplay(props) {
  const {
    balance,
    className = '',
    label,
    params
  } = props;

  if (!params) {
    return null;
  }

  return balance ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: renderProvided({
      className,
      label,
      value: balance
    })
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.Balance, {
    className: `ui--Balance ${className}`,
    label: label,
    params: params
  });
}

var _default = /*#__PURE__*/_react.default.memo(BalanceDisplay);

exports.default = _default;