// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import strengthTester from 'owasp-password-strength-test';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const MAX_STRENGTH = 7; // equal to number of password tests in owasp strength tester

strengthTester.config({
  allowPassphrases: true,
  maxLength: 128,
  minLength: 8,
  minPhraseLength: 20
});

function calcStrength(password) {
  const testResult = strengthTester.test(password);
  const passedTests = Math.max(0, testResult.passedTests.length - testResult.failedTests.length);
  return testResult.isPassphrase ? MAX_STRENGTH : passedTests;
}

function PasswordStrength({
  className = '',
  value
}) {
  const {
    t
  } = useTranslation();
  const passwordStrength = calcStrength(value);
  const style = {
    width: `${passwordStrength * 100 / MAX_STRENGTH}%`
  };
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    style: {
      display: value ? 'flex' : 'none'
    },
    children: [t('weak'), /*#__PURE__*/_jsx("div", {
      className: "ui--Strength-bar",
      children: /*#__PURE__*/_jsx("div", {
        className: "ui--Strength-bar-highlighted",
        style: style
      })
    }), t('strong')]
  });
}

export default /*#__PURE__*/React.memo(styled(PasswordStrength).withConfig({
  displayName: "PasswordStrength",
  componentId: "sc-p364a5-0"
})(["align-items:center;margin-top:0.5rem;margin-left:2rem;font-size:1rem;text-transform:uppercase;color:var(--color-label);.ui--Strength-bar{position:relative;height:0.6rem;width:100%;margin:0 10px;border:1px solid #DFDFDF;border-radius:0.15rem;background:#ECECEC;}.ui--Strength-bar-highlighted{position:absolute;top:-0.07rem;height:0.6rem;width:100%;border-radius:0.15rem;background:linear-gradient(90.43deg,#FF8B00 0%,#FFBB50 112.75%);}"]));