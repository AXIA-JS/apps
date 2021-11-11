import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
// overrides based on the actual software node type, valid values are one of -
// axia, substrate, beachball, robohash
export const identityNodes = [['centrifuge chain', 'axia'], ['joystream-node', 'beachball'], ['parity-axia', 'axia']].reduce((icons, [node, icon]) => _objectSpread(_objectSpread({}, icons), {}, {
  [node.toLowerCase().replace(/-/g, ' ')]: icon
}), {});
export const identitySpec = [['axialunar', 'axia'], ['axia', 'axia'], ['betanet', 'axia'], ['statemine', 'axia'], ['statemint', 'axia'], ['alphanet', 'axia'], ['westmint', 'axia']].reduce((icons, [spec, icon]) => _objectSpread(_objectSpread({}, icons), {}, {
  [spec.toLowerCase().replace(/-/g, ' ')]: icon
}), {});