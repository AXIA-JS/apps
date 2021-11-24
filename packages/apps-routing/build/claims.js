// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Component, { useCounter } from '@axia-js/app-claims';
export default function create(t) {
  return {
    Component,
    display: {
      needsAccounts: true,
      needsApi: ['tx.claims.mintClaim']
    },
    group: 'accounts',
    icon: 'star',
    name: 'claims',
    text: t('nav.claims', 'Claim Tokens', {
      ns: 'apps-routing'
    }),
    useCounter
  };
}