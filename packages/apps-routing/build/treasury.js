// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Component, { useCounter } from '@axia-js/app-treasury';
export default function create(t) {
  return {
    Component,
    display: {
      needsApi: ['tx.treasury.proposeSpend']
    },
    group: 'governance',
    icon: 'gem',
    name: 'treasury',
    text: t('nav.treasury', 'Treasury', {
      ns: 'apps-routing'
    }),
    useCounter
  };
}