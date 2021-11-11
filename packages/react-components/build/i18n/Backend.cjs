"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cache = _interopRequireDefault(require("./cache.cjs"));

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const loaders = {};

class Backend {
  constructor() {
    this.type = 'backend';
  }

  async read(lng, _namespace, responder) {
    if (_cache.default[lng]) {
      return responder(null, _cache.default[lng]);
    } // eslint-disable-next-line @typescript-eslint/no-misused-promises


    if (!loaders[lng]) {
      loaders[lng] = this.createLoader(lng);
    }

    const [error, data] = await loaders[lng];
    return responder(error, data);
  }

  async createLoader(lng) {
    try {
      const response = await fetch(`locales/${lng}/translation.json`, {});

      if (!response.ok) {
        return [`i18n: failed loading ${lng}`, response.status >= 500 && response.status < 600];
      } else {
        _cache.default[lng] = await response.json();
        return [null, _cache.default[lng]];
      }
    } catch (error) {
      return [error.message, false];
    }
  }

}

exports.default = Backend;
Backend.type = 'backend';