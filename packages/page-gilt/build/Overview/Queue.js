// Copyright 2017-2021 @axia-js/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { FormatBalance } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Queue({
  className,
  value: {
    balance,
    index,
    numItems
  }
}) {
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx("h1", {
        children: formatNumber(index)
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number all",
      children: formatNumber(numItems)
    }), /*#__PURE__*/_jsx("td", {
      className: "all",
      children: /*#__PURE__*/_jsx(FormatBalance, {
        value: balance
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Queue);