"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStepper = useStepper;

var _react = require("react");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useStepper() {
  const [step, setStep] = (0, _react.useState)(1);
  const nextStep = (0, _react.useCallback)(() => setStep(step => step + 1), []);
  const prevStep = (0, _react.useCallback)(() => setStep(step => step - 1), []);
  return [step, nextStep, prevStep, setStep];
}