"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _owaspPasswordStrengthTest = _interopRequireDefault(require("owasp-password-strength-test"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const MAX_STRENGTH = 7; // equal to number of password tests in owasp strength tester

_owaspPasswordStrengthTest.default.config({
  allowPassphrases: true,
  maxLength: 128,
  minLength: 8,
  minPhraseLength: 20
});

function calcStrength(password) {
  const testResult = _owaspPasswordStrengthTest.default.test(password);

  const passedTests = Math.max(0, testResult.passedTests.length - testResult.failedTests.length);
  return testResult.isPassphrase ? MAX_STRENGTH : passedTests;
}

function PasswordStrength(_ref) {
  let {
    className = '',
    value
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const passwordStrength = calcStrength(value);
  const style = {
    width: `${passwordStrength * 100 / MAX_STRENGTH}%`
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    style: {
      display: value ? 'flex' : 'none'
    },
    children: [t('weak'), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--Strength-bar",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--Strength-bar-highlighted",
        style: style
      })
    }), t('strong')]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(PasswordStrength).withConfig({
  displayName: "PasswordStrength",
  componentId: "sc-i80xso-0"
})(["align-items:center;margin-top:0.5rem;margin-left:2rem;font-size:1rem;text-transform:uppercase;color:var(--color-label);.ui--Strength-bar{position:relative;height:0.6rem;width:100%;margin:0 10px;border:1px solid #DFDFDF;border-radius:0.15rem;background:#ECECEC;}.ui--Strength-bar-highlighted{position:absolute;top:-0.07rem;height:0.6rem;width:100%;border-radius:0.15rem;background:linear-gradient(90.43deg,#FF8B00 0%,#FFBB50 112.75%);}"]));

exports.default = _default;