"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useParamDefs;

var _react = require("react");

var _create = require("@axia-js/types/create");

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function expandDef(registry, td) {
  try {
    return (0, _create.getTypeDef)(registry.createType(td.type).toRawType());
  } catch (e) {
    return td;
  }
}

function useParamDefs(registry, type) {
  const [params, setParams] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    const typeDef = expandDef(registry, type);

    if (!typeDef.sub) {
      return setParams([]);
    }

    setParams((Array.isArray(typeDef.sub) ? typeDef.sub : [typeDef.sub]).map(td => ({
      length: typeDef.length,
      name: td.name,
      type: td // expandDef(td)

    })));
  }, [registry, type]);
  return params;
}