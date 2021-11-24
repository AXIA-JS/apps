"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = require("styled-components");

var _constants = require("./constants.cjs");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const media = Object.keys(_constants.ScreenSizes).reduce((acc, label) => {
  const size = _constants.ScreenSizes[label];

  acc[label] = values => (0, _styledComponents.css)(["@media (min-width:", "em){", "}"], size / 16, values);

  return acc;
}, {});
var _default = media;
exports.default = _default;