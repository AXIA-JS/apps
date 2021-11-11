// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Digits } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { formatNumber } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function BestFinalized({
  children,
  className = '',
  label
}) {
  const {
    api
  } = useApi();
  const bestNumberFinalized = useCall(api.derive.chain.bestNumberFinalized);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [label || '', bestNumberFinalized ? /*#__PURE__*/_jsx(Digits, {
      value: formatNumber(bestNumberFinalized)
    }) : '-', children]
  });
}

export default /*#__PURE__*/React.memo(BestFinalized);