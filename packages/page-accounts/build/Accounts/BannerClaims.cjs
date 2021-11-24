"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _useCounter = _interopRequireDefault(require("@axia-js/app-claims/useCounter"));

var _translate = require("../translate.cjs");

var _Banner = _interopRequireDefault(require("./Banner.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
// exceptionally CRAP idea
function BannerExtension() {
  const claimCount = (0, _useCounter.default)();
  const {
    t
  } = (0, _translate.useTranslation)();

  if (!claimCount) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Banner.default, {
    type: "error",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
      children: [t('You have {{claimCount}} accounts that need attestations. Use the Claim Tokens app on the navigation bar to complete the process. Until you do, your balances for those accounts will not be reflected.', {
        replace: {
          claimCount
        }
      }), "\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
        href: "#/claims",
        children: t('Claim tokens...')
      })]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(BannerExtension);

exports.default = _default;