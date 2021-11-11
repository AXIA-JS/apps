import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { genshiro } from '@equilab/definitions';
import { createCustomAccount, u64FromCurrency } from "./equilibrium.js";
const definitions = {
  derives: _objectSpread({}, genshiro.instances.balances.reduce((all, cur) => _objectSpread(_objectSpread({}, all), {}, {
    [cur]: {
      customAccount: createCustomAccount(cur, currency => ({
        0: u64FromCurrency(currency)
      }), 'CompatAccountData')
    }
  }), {})),
  instances: genshiro.instances,
  types: [{
    // on all versions
    minmax: [0, undefined],
    types: genshiro.types
  }]
};
export default definitions;