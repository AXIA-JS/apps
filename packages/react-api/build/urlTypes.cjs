"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeUrlTypes = decodeUrlTypes;
exports.encodeUrlTypes = encodeUrlTypes;

var _fflate = require("fflate");

var _queryString = _interopRequireDefault(require("query-string"));

var _uiSettings = require("@axia-js/ui-settings");

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

// Copyright 2017-2021 @axia-js/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
function decodeUrlTypes() {
  const urlOptions = _queryString.default.parse(location.href.split('?')[1]);

  if (urlOptions.types) {
    try {
      (0, _util.assert)(!Array.isArray(urlOptions.types), 'Expected a single type specification');
      const parts = urlOptions.types.split('#');
      const compressed = (0, _utilCrypto.base64Decode)(decodeURIComponent(parts[0]));
      const uncompressed = (0, _fflate.unzlibSync)(compressed);
      return JSON.parse((0, _util.u8aToString)(uncompressed));
    } catch (error) {
      console.error(error);
    }
  }

  return null;
}

function encodeUrlTypes(types) {
  const jsonU8a = (0, _util.stringToU8a)(JSON.stringify(types));
  const compressed = (0, _fflate.zlibSync)(jsonU8a, {
    level: 9
  });
  const encoded = (0, _utilCrypto.base64Encode)(compressed);
  return `${window.location.origin}${window.location.pathname}?rpc=${encodeURIComponent(_uiSettings.settings.apiUrl)}&types=${encodeURIComponent(encoded)}`;
}