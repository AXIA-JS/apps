"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeWrapper;

// Copyright 2017-2021 @axia-js/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0
function makeWrapper(isDevelopment) {
  const args = `api, hashing, ${isDevelopment ? 'keyring, ' : ''}types, util`;
  return `// All code is wrapped within an async closure,
// allowing access to ${args}.
// (async ({ ${args} }) => {
//   ... any user code is executed here ...
// })();

`;
}