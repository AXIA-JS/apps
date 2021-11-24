"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Multisig(_ref) {
  let {
    isMultisig,
    meta
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();

  if (!isMultisig || !meta) {
    return null;
  }

  const {
    threshold,
    who
  } = meta;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: "ui--AddressMenu-multisig withDivider",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--AddressMenu-sectionHeader",
      children: t('multisig')
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--AddressMenu-multisigTable",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "tr",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "th",
          children: t('threshold')
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "td",
          children: [threshold, "/", who.length]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "tr",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "th signatories",
          children: t('signatories')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "td",
          children: who === null || who === void 0 ? void 0 : who.map(address => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
            value: address
          }, address))
        })]
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Multisig);

exports.default = _default;