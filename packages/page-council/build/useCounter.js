// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useAccounts, useApi, useCall } from '@axia-js/react-hooks';
const transformCounter = {
  transform: motions => motions.filter(({
    votes
  }) => !!votes).length
};
export default function useCounter() {
  var _api$derive$council;

  const {
    hasAccounts
  } = useAccounts();
  const {
    api,
    isApiReady
  } = useApi();
  const counter = useCall(isApiReady && hasAccounts && ((_api$derive$council = api.derive.council) === null || _api$derive$council === void 0 ? void 0 : _api$derive$council.proposals), undefined, transformCounter) || 0;
  return counter;
}