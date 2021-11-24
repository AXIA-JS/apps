"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onlyOnWeb = exports.onlyOnApp = void 0;

var _index = require("../util/index.cjs");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
const onlyOn = environment => component => {
  if ((0, _index.getEnvironment)() === environment) {
    return component;
  }

  return () => null;
};

const onlyOnWeb = onlyOn('web');
exports.onlyOnWeb = onlyOnWeb;
const onlyOnApp = onlyOn('app');
exports.onlyOnApp = onlyOnApp;