// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';
import FormatBalance from "./FormatBalance.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function TotalIssuance({
  children,
  className = '',
  label
}) {
  var _api$query$balances;

  const {
    api
  } = useApi();
  const totalIssuance = useCall((_api$query$balances = api.query.balances) === null || _api$query$balances === void 0 ? void 0 : _api$query$balances.totalIssuance);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [label || '', /*#__PURE__*/_jsx(FormatBalance, {
      value: totalIssuance,
      withSi: true
    }), children]
  });
}

export default /*#__PURE__*/React.memo(TotalIssuance);