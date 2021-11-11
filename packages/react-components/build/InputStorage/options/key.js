// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { getSiName } from '@axia-js/types/metadata/util';
import { unwrapStorageType } from '@axia-js/types/primitive/StorageKey';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
export default function createOptions(api, sectionName) {
  const section = api.query[sectionName];

  if (!section || Object.keys(section).length === 0) {
    return [];
  }

  return Object.keys(section).sort().map(value => {
    const {
      meta: {
        docs,
        modifier,
        name,
        type
      }
    } = section[value];
    const output = unwrapStorageType(api.registry, type, modifier.isOptional);
    let input = '';

    if (type.isMap) {
      const {
        hashers,
        key
      } = type.asMap;

      if (hashers.length === 1) {
        input = getSiName(api.registry.lookup, key);
      } else {
        const si = api.registry.lookup.getSiType(key).def;

        if (si.isTuple) {
          input = si.asTuple.map(t => getSiName(api.registry.lookup, t)).join(', ');
        } else {
          input = si.asHistoricMetaCompat.toString();
        }
      }
    }

    return {
      className: 'ui--DropdownLinked-Item',
      key: `${sectionName}_${value}`,
      text: [/*#__PURE__*/_jsxs("div", {
        className: "ui--DropdownLinked-Item-call",
        children: [value, "(", input, "): ", output]
      }, `${sectionName}_${value}:call`), /*#__PURE__*/_jsx("div", {
        className: "ui--DropdownLinked-Item-text",
        children: (docs[0] || name).toString()
      }, `${sectionName}_${value}:text`)],
      value
    };
  });
}