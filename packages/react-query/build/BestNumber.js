// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Digits } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { formatNumber } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function BestNumber({
  children,
  className = '',
  isFinalized,
  label,
  withPound
}) {
  const {
    api,
    isApiReady
  } = useApi();
  const bestNumber = useCall(isApiReady && (isFinalized ? api.derive.chain.bestNumberFinalized : api.derive.chain.bestNumber));
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [label || '', withPound && '#', bestNumber ? /*#__PURE__*/_jsx(Digits, {
      value: formatNumber(bestNumber)
    }) : '-', children]
  });
}

export default /*#__PURE__*/React.memo(BestNumber);