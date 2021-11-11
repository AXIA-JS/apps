// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Component, { useCounter } from '@axia-js/app-accounts';
export default function create(t) {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'accounts',
    icon: 'users',
    name: 'accounts',
    text: t('nav.accounts', 'Accounts', {
      ns: 'apps-routing'
    }),
    useCounter
  };
}