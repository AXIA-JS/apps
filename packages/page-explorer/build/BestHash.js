// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';
import { jsxs as _jsxs } from "react/jsx-runtime";

function BestHash({
  className = '',
  label
}) {
  const {
    api
  } = useApi();
  const newHead = useCall(api.rpc.chain.subscribeNewHeads);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [label || '', newHead === null || newHead === void 0 ? void 0 : newHead.hash.toHex()]
  });
}

export default /*#__PURE__*/React.memo(BestHash);