// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { AddressSmall } from '@axia-js/react-components';
import { FormatBalance } from '@axia-js/react-query';
import BidType from "../Candidates/BidType.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Suspension({
  balance,
  bid,
  value
}) {
  return /*#__PURE__*/_jsxs("tr", {
    children: [/*#__PURE__*/_jsx("td", {
      className: "address all",
      children: /*#__PURE__*/_jsx(AddressSmall, {
        value: value
      })
    }), /*#__PURE__*/_jsx(BidType, {
      value: bid
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: balance && /*#__PURE__*/_jsx(FormatBalance, {
        value: balance
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Suspension);