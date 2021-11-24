// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useApi, useCall } from '@axia-js/react-hooks';
const transformCounter = {
  transform: proposals => proposals.length
};
export default function useCounter() {
  var _api$query$membership;

  const {
    api,
    isApiReady
  } = useApi();
  const counter = useCall(isApiReady && ((_api$query$membership = api.query.membership) === null || _api$query$membership === void 0 ? void 0 : _api$query$membership.proposals), undefined, transformCounter) || 0;
  return counter;
}