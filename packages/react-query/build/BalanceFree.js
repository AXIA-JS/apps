// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';
import FormatBalance from "./FormatBalance.js";
import { jsx as _jsx } from "react/jsx-runtime";

function BalanceFree({
  children,
  className = '',
  label,
  params
}) {
  var _api$derive$balances;

  const {
    api
  } = useApi();
  const allBalances = useCall((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [params]);
  return /*#__PURE__*/_jsx(FormatBalance, {
    className: className,
    label: label,
    value: allBalances === null || allBalances === void 0 ? void 0 : allBalances.freeBalance,
    children: children
  });
}

export default /*#__PURE__*/React.memo(BalanceFree);