"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
const WITH_BALANCE = {
  available: true,
  bonded: true,
  free: true,
  locked: true,
  reserved: true,
  total: true
};

function Balances({
  address,
  className
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--AddressMenu-sectionHeader",
      children: t('balance')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressInfo, {
      address: address,
      className: "balanceExpander",
      withBalance: WITH_BALANCE,
      withExtended: false,
      withLabel: true
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Balances).withConfig({
  displayName: "Balances",
  componentId: "sc-tkzt3f-0"
})([".balanceExpander{justify-content:flex-start;.column{width:auto;max-width:18.57rem;label{text-align:left;color:inherit;font-size:0.93rem;font-weight:var(--font-weight-normal);}.ui--Expander-content .ui--FormatBalance-value{font-size:0.93rem;}}}"]));

exports.default = _default;