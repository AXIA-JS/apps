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

// Copyright 2017-2021 @axia-js/page-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function AddressSection(_ref) {
  let {
    accountIndex,
    defaultValue,
    editingName,
    flags,
    onChange,
    value
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "ui--AddressSection",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.IdentityIcon, {
      size: 80,
      value: value
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--AddressSection__AddressColumn",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AccountName, {
        override: editingName ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          className: "name--input",
          defaultValue: defaultValue,
          label: "name-input",
          onChange: onChange,
          withLabel: false
        }) : flags.isEditable ? defaultValue.toUpperCase() || t('<unknown>') : undefined,
        value: value,
        withSidebar: false
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--AddressMenu-addr",
        children: value
      }), accountIndex && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "ui--AddressMenu-index",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
          children: [t('index'), ":"]
        }), " ", accountIndex]
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(AddressSection);

exports.default = _default;