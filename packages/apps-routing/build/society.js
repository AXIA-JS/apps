// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Component, { useCounter } from '@axia-js/app-society';
export default function create(t) {
  return {
    Component,
    display: {
      needsAccounts: true,
      needsApi: ['query.society.pot']
    },
    group: 'network',
    icon: 'hand-spock',
    name: 'society',
    text: t('nav.society', 'Society', {
      ns: 'apps-routing'
    }),
    useCounter
  };
}