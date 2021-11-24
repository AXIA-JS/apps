// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useApi } from '@axia-js/react-hooks';
import DispatchQueue from "./DispatchQueue.js";
import Scheduler from "./Scheduler.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Execute({
  className
}) {
  const {
    api
  } = useApi();
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(DispatchQueue, {}), api.query.scheduler && /*#__PURE__*/_jsx(Scheduler, {})]
  });
}

export default /*#__PURE__*/React.memo(Execute);