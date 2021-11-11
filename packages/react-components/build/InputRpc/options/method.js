// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
export default function createOptions(api, rpcs, sectionName) {
  const section = rpcs[sectionName];

  if (!section || Object.keys(api.rpc[sectionName]).length === 0) {
    return [];
  }

  return Object.keys(api.rpc[sectionName]).sort().map(methodName => section[methodName]).filter(ext => !!ext).filter(({
    isSubscription
  }) => !isSubscription).map(({
    description,
    method,
    params
  }) => {
    const inputs = params.map(({
      name
    }) => name).join(', ');
    return {
      className: 'ui--DropdownLinked-Item',
      key: `${sectionName}_${method}`,
      text: [/*#__PURE__*/_jsxs("div", {
        className: "ui--DropdownLinked-Item-call",
        children: [method, "(", inputs, ")"]
      }, `${sectionName}_${method}:call`), /*#__PURE__*/_jsx("div", {
        className: "ui--DropdownLinked-Item-text",
        children: description || method
      }, `${sectionName}_${method}:text`)],
      value: method
    };
  });
}