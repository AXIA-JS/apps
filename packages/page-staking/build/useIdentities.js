// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useApi, useCall } from '@axia-js/react-hooks';

function transformIdentity([[validatorIds], hasIdentities]) {
  return validatorIds.reduce((result, validatorId, index) => {
    result[validatorId] = hasIdentities[index];
    return result;
  }, {});
}

export default function useIdentities(validatorIds = []) {
  const {
    api
  } = useApi();
  const allIdentity = useCall(api.derive.accounts.hasIdentityMulti, [validatorIds], {
    transform: transformIdentity,
    withParamsTransform: true
  });
  return allIdentity;
}