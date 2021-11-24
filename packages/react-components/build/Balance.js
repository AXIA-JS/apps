// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Balance, FormatBalance } from '@axia-js/react-query';
import { BN_ZERO } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export function renderProvided({
  className = '',
  label,
  value
}) {
  let others;

  if (Array.isArray(value)) {
    const totals = value.filter((_, index) => index !== 0);
    const total = totals.reduce((total, value) => total.add(value), BN_ZERO).gtn(0);

    if (total) {
      others = totals.map((balance, index) => /*#__PURE__*/_jsx(FormatBalance, {
        value: balance
      }, index));
    }
  }

  return /*#__PURE__*/_jsx(FormatBalance, {
    className: `ui--Balance ${className}`,
    label: label,
    value: Array.isArray(value) ? value[0] : value,
    children: others && /*#__PURE__*/_jsxs("span", {
      children: ["\xA0(+", others, ")"]
    })
  });
}

function BalanceDisplay(props) {
  const {
    balance,
    className = '',
    label,
    params
  } = props;

  if (!params) {
    return null;
  }

  return balance ? /*#__PURE__*/_jsx(_Fragment, {
    children: renderProvided({
      className,
      label,
      value: balance
    })
  }) : /*#__PURE__*/_jsx(Balance, {
    className: `ui--Balance ${className}`,
    label: label,
    params: params
  });
}

export default /*#__PURE__*/React.memo(BalanceDisplay);