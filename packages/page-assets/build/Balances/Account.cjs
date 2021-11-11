"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactQuery = require("@axia-js/react-query");

var _translate = require("../translate.cjs");

var _Transfer = _interopRequireDefault(require("./Transfer.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Account({
  accountId,
  assetId,
  balance: {
    balance,
    isFrozen,
    isSufficient
  },
  className,
  minBalance,
  siFormat
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: accountId
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "start",
      children: isFrozen.isTrue ? t('Yes') : t('No')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "start",
      children: isSufficient.isTrue ? t('Yes') : t('No')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number all",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        format: siFormat,
        value: balance
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "button",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Transfer.default, {
        accountId: accountId,
        assetId: assetId,
        minBalance: minBalance,
        siFormat: siFormat
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Account);

exports.default = _default;