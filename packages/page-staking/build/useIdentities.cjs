"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useIdentities;

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function transformIdentity([[validatorIds], hasIdentities]) {
  return validatorIds.reduce((result, validatorId, index) => {
    result[validatorId] = hasIdentities[index];
    return result;
  }, {});
}

function useIdentities(validatorIds = []) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const allIdentity = (0, _reactHooks.useCall)(api.derive.accounts.hasIdentityMulti, [validatorIds], {
    transform: transformIdentity,
    withParamsTransform: true
  });
  return allIdentity;
}