"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../translate.cjs");

var _Voters = _interopRequireDefault(require("./Voters.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Candidate(_ref) {
  let {
    address,
    balance,
    className = '',
    isPrime,
    voters
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: address
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      children: isPrime && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tag, {
        color: "green",
        hover: t('Current prime member, default voting'),
        label: t('prime voter')
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Voters.default, {
      balance: balance,
      voters: voters
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Candidate);

exports.default = _default;