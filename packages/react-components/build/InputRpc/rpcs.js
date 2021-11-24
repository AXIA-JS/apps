import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import jsonrpc from '@axia-js/types/interfaces/jsonrpc';
import { getSpecRpc } from '@axia-js/types-known';

function toExt(section, input) {
  return Object.entries(input).reduce((output, [method, def]) => {
    output[method] = _objectSpread({
      isSubscription: false,
      jsonrpc: `${method}_${section}`,
      method,
      section
    }, def);
    return output;
  }, {});
}

export function getAllRpc(registry, chain, {
  specName
}) {
  return Object.entries(getSpecRpc(registry, chain, specName)).reduce((all, [section, contents]) => {
    var _all$section;

    (_all$section = all[section]) !== null && _all$section !== void 0 ? _all$section : all[section] = toExt(section, contents);
    return all;
  }, _objectSpread({}, jsonrpc));
}