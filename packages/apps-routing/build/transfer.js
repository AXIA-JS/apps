// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Modal from '@axia-js/app-accounts/modals/Transfer';
export default function create(t) {
  return {
    Component: Modal,
    Modal,
    display: {
      isHidden: false,
      needsAccounts: true,
      needsApi: ['tx.balances.transfer']
    },
    group: 'accounts',
    icon: 'paper-plane',
    name: 'transfer',
    text: t('nav.transfer', 'Transfer', {
      ns: 'apps-routing'
    })
  };
}