// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Component, { useCounter } from '@axia-js/app-bounties';
export default function create(t) {
  return {
    Component,
    display: {
      needsApi: [['tx.bounties.proposeBounty', 'tx.treasury.proposeBounty']]
    },
    group: 'governance',
    icon: 'coins',
    name: 'bounties',
    text: t('nav.bounties', 'Bounties', {
      ns: 'apps-routing'
    }),
    useCounter
  };
}