"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("./translate.cjs");

var _useAXIAPreclaims = _interopRequireDefault(require("./useAXIAPreclaims.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-claims authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Warning({
  className
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const needsAttest = (0, _useAXIAPreclaims.default)();

  if (!needsAttest.length) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Card, {
    isError: true,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: className,
      children: [needsAttest.length > 1 ? t('You need to sign an attestation for the following accounts:') : t('You need to sign an attestation for the following account:'), needsAttest.map(address => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
        value: address
      }, address))]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Warning).withConfig({
  displayName: "Warning",
  componentId: "sc-9xp5zu-0"
})(["font-size:1.15rem;display:flex;flex-direction:column;justify-content:center;min-height:8rem;align-items:center;margin:0 1rem;.ui--AddressMini-address{max-width:20rem;}"]));

exports.default = _default;