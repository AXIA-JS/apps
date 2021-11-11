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
const isElectron = navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;

function ExternalWarning() {
  const {
    t
  } = (0, _translate.useTranslation)();

  if (isElectron) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
    content: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [t('Consider storing your account in a signer such as a browser extension, hardware device, QR-capable phone wallet (non-connected) or desktop application for optimal account security.'), "\xA0", t('Future versions of the web-only interface will drop support for non-external accounts, much like the IPFS version.')]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(ExternalWarning);

exports.default = _default;