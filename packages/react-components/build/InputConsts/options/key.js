// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { getSiName } from '@axia-js/types/metadata/util';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
export default function createOptions(api, sectionName) {
  const section = api.consts[sectionName];

  if (!section || Object.keys(section).length === 0) {
    return [];
  }

  return Object.keys(section).sort().map(value => {
    const method = section[value];
    return {
      className: 'ui--DropdownLinked-Item',
      key: `${sectionName}_${value}`,
      text: [/*#__PURE__*/_jsxs("div", {
        className: "ui--DropdownLinked-Item-call",
        children: [value, ": ", getSiName(api.registry.lookup, method.meta.type)]
      }, `${sectionName}_${value}:call`), /*#__PURE__*/_jsx("div", {
        className: "ui--DropdownLinked-Item-text",
        children: (method.meta.docs[0] || method.meta.name).toString()
      }, `${sectionName}_${value}:text`)],
      value
    };
  });
}