// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import App from "./App.js";
import { jsx as _jsx } from "react/jsx-runtime";
export { default as useCounter } from "./useCounter.js";

function TechComm({
  basePath,
  className
}) {
  return /*#__PURE__*/_jsx(App, {
    basePath: basePath,
    className: className,
    type: "technicalCommittee"
  });
}

export default /*#__PURE__*/React.memo(TechComm);