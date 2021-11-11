// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
export default function createOptions(api, sectionName) {
  const section = api.tx[sectionName];

  if (!section || Object.keys(section).length === 0) {
    return [];
  }

  return Object.keys(section).sort().map(value => {
    const method = section[value];
    const inputs = method.meta.args.map(arg => arg.name.toString()).join(', ');
    return {
      className: 'ui--DropdownLinked-Item',
      key: `${sectionName}_${value}`,
      text: [/*#__PURE__*/_jsxs("div", {
        className: "ui--DropdownLinked-Item-call",
        children: [value, "(", inputs, ")"]
      }, `${sectionName}_${value}:call`), /*#__PURE__*/_jsx("div", {
        className: "ui--DropdownLinked-Item-text",
        children: (method.meta.docs[0] || value).toString()
      }, `${sectionName}_${value}:text`)],
      value
    };
  });
}