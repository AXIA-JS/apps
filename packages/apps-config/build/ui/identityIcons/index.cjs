"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identitySpec = exports.identityNodes = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
// overrides based on the actual software node type, valid values are one of -
// axia, substrate, beachball, robohash
const identityNodes = [['centrifuge chain', 'axia'], ['joystream-node', 'beachball'], ['axia-axia', 'axia']].reduce((icons, _ref) => {
  let [node, icon] = _ref;
  return _objectSpread(_objectSpread({}, icons), {}, {
    [node.toLowerCase().replace(/-/g, ' ')]: icon
  });
}, {});
exports.identityNodes = identityNodes;
const identitySpec = [['axialunar', 'axia'], ['axia', 'axia'], ['betanet', 'axia'], ['statemine', 'axia'], ['statemint', 'axia'], ['alphanet', 'axia'], ['westmint', 'axia']].reduce((icons, _ref2) => {
  let [spec, icon] = _ref2;
  return _objectSpread(_objectSpread({}, icons), {}, {
    [spec.toLowerCase().replace(/-/g, ' ')]: icon
  });
}, {});
exports.identitySpec = identitySpec;