// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import CallDisplay from "./Call.js";
import Expander from "./Expander.js";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

function CallExpander({
  children,
  className = '',
  labelHash,
  value,
  withHash
}) {
  const {
    meta,
    method,
    section
  } = value.registry.findMetaCall(value.callIndex);
  return /*#__PURE__*/_jsx("div", {
    className: `ui--CallExpander ${className}`,
    children: /*#__PURE__*/_jsxs(Expander, {
      summaryHead: /*#__PURE__*/_jsxs("div", {
        children: [section, ".", method]
      }),
      summaryMeta: meta,
      children: [/*#__PURE__*/_jsx(CallDisplay, {
        labelHash: labelHash,
        value: value,
        withHash: withHash
      }), children]
    })
  });
}

export default /*#__PURE__*/React.memo(CallExpander);