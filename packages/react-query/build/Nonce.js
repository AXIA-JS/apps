// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';
import { formatNumber } from '@axia-js/util';
import { jsxs as _jsxs } from "react/jsx-runtime";

function Nonce({
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
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [label || '', formatNumber(allBalances === null || allBalances === void 0 ? void 0 : allBalances.accountNonce), children]
  });
}

export default /*#__PURE__*/React.memo(Nonce);