"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHistoric;

// Copyright 2017-2021 @axia-js/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getHistoric(atQuery, params, hashes) {
  return Promise.all(hashes.map(hash => atQuery(hash, ...params))).then(results => results.map((value, index) => [hashes[index], value]));
}