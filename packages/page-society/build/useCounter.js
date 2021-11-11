// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useApi, useCall } from '@axia-js/react-hooks';
export default function useCounter() {
  var _api$query$society;

  const {
    api
  } = useApi();
  const bids = useCall((_api$query$society = api.query.society) === null || _api$query$society === void 0 ? void 0 : _api$query$society.candidates);
  return (bids === null || bids === void 0 ? void 0 : bids.length) || 0;
}