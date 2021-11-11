import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useAccounts, useApi, useCall } from '@axia-js/react-hooks';
const EMPTY_FLAGS = {
  isAdminMe: false,
  isFreezerMe: false,
  isIssuerMe: false,
  isOwnerMe: false
};
const QUERY_OPTS = {
  withParams: true
};

function isAccount(allAccounts, accountId) {
  const address = accountId.toString();
  return allAccounts.some(a => a === address);
}

function extractInfo(allAccounts, id, optDetails, metadata) {
  const details = optDetails.unwrapOr(null);
  return _objectSpread(_objectSpread({}, details ? {
    isAdminMe: isAccount(allAccounts, details.admin),
    isFreezerMe: isAccount(allAccounts, details.freezer),
    isIssuerMe: isAccount(allAccounts, details.issuer),
    isOwnerMe: isAccount(allAccounts, details.owner)
  } : EMPTY_FLAGS), {}, {
    details,
    id,
    key: id.toString(),
    metadata: metadata.isEmpty ? null : metadata
  });
}

export default function useAssetInfos(ids) {
  const {
    api
  } = useApi();
  const {
    allAccounts
  } = useAccounts();
  const metadata = useCall(api.query.assets.metadata.multi, [ids], QUERY_OPTS);
  const details = useCall(api.query.assets.asset.multi, [ids], QUERY_OPTS);
  const [state, setState] = useState();
  useEffect(() => {
    details && metadata && details[0][0].length === metadata[0][0].length && setState(details[0][0].map((id, index) => extractInfo(allAccounts, id, details[1][index], metadata[1][index])));
  }, [allAccounts, details, ids, metadata]);
  return state;
}