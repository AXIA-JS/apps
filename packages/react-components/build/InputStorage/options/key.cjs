"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createOptions;

var _react = _interopRequireDefault(require("react"));

var _util = require("@axia-js/types/metadata/util");

var _StorageKey = require("@axia-js/types/primitive/StorageKey");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createOptions(api, sectionName) {
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
    const output = (0, _StorageKey.unwrapStorageType)(api.registry, type, modifier.isOptional);
    let input = '';

    if (type.isMap) {
      const {
        hashers,
        key
      } = type.asMap;

      if (hashers.length === 1) {
        input = (0, _util.getSiName)(api.registry.lookup, key);
      } else {
        const si = api.registry.lookup.getSiType(key).def;

        if (si.isTuple) {
          input = si.asTuple.map(t => (0, _util.getSiName)(api.registry.lookup, t)).join(', ');
        } else {
          input = si.asHistoricMetaCompat.toString();
        }
      }
    }

    return {
      className: 'ui--DropdownLinked-Item',
      key: `${sectionName}_${value}`,
      text: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "ui--DropdownLinked-Item-call",
        children: [value, "(", input, "): ", output]
      }, `${sectionName}_${value}:call`), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--DropdownLinked-Item-text",
        children: (docs[0] || name).toString()
      }, `${sectionName}_${value}:text`)],
      value
    };
  });
}