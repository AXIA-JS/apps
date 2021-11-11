// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { Columar } from '@axia-js/react-components';
import ChartPoints from "./ChartPoints.js";
import ChartPrefs from "./ChartPrefs.js";
import ChartRewards from "./ChartRewards.js";
import ChartStake from "./ChartStake.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Validator({
  className = '',
  validatorId
}) {
  return /*#__PURE__*/_jsxs(Columar, {
    className: className,
    children: [/*#__PURE__*/_jsxs(Columar.Column, {
      children: [/*#__PURE__*/_jsx(ChartPoints, {
        validatorId: validatorId
      }), /*#__PURE__*/_jsx(ChartRewards, {
        validatorId: validatorId
      })]
    }), /*#__PURE__*/_jsxs(Columar.Column, {
      children: [/*#__PURE__*/_jsx(ChartStake, {
        validatorId: validatorId
      }), /*#__PURE__*/_jsx(ChartPrefs, {
        validatorId: validatorId
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Validator).withConfig({
  displayName: "Validator",
  componentId: "sc-f71cuz-0"
})([".staking--Chart{background:var(--bg-table);border:1px solid var(--border-table);border-radius:0.25rem;padding:1rem 1.5rem;}"]));