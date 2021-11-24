// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useAccounts, useApi, useCall } from '@axia-js/react-hooks';
const queryOptions = {
  transform: ([[params], balances]) => ({
    assetId: params[0][0],
    balances: params.map(([, accountId], index) => ({
      accountId,
      balance: balances[index]
    })).filter(({
      balance: {
        balance
      }
    }) => !balance.isZero())
  }),
  withParamsTransform: true
};
export default function useBalances(id) {
  const {
    api
  } = useApi();
  const {
    allAccounts
  } = useAccounts();
  const query = useCall(id && api.query.assets.account.multi, id && [allAccounts.map(a => [id, a])], queryOptions);
  return query && id && query.assetId === id && query.balances || null;
}