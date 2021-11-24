// Copyright 2017-2021 @axia-js/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { Button } from '@axia-js/react-components';
import { useProxies } from "../useProxies.js";
import BidAdd from "./BidAdd.js";
import Queues from "./Queues.js";
import Summary from "./Summary.js";
import useInfo from "./useInfo.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Overview({
  className
}) {
  const proxies = useProxies();
  const {
    info
  } = useInfo();
  const isDisabled = useMemo(() => !info || !info.activeTotal || info.activeTotal.target.isZero(), [info]);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Summary, {
      activeTotal: info === null || info === void 0 ? void 0 : info.activeTotal,
      isDisabled: isDisabled
    }), /*#__PURE__*/_jsx(Button.Group, {
      children: /*#__PURE__*/_jsx(BidAdd, {
        isDisabled: isDisabled,
        proxies: proxies
      })
    }), /*#__PURE__*/_jsx(Queues, {
      queueTotals: info === null || info === void 0 ? void 0 : info.queueTotals
    })]
  });
}

export default /*#__PURE__*/React.memo(Overview);