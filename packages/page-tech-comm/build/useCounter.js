// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useApi, useCall } from '@axia-js/react-hooks';
const transformCounter = {
  transform: proposals => proposals.length
};
export default function useCounter() {
  var _api$derive$technical;

  const {
    api,
    isApiReady
  } = useApi();
  const counter = useCall(isApiReady && ((_api$derive$technical = api.derive.technicalCommittee) === null || _api$derive$technical === void 0 ? void 0 : _api$derive$technical.proposals), undefined, transformCounter) || 0;
  return counter;
}