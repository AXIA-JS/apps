// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Component, { useCounter } from '@axia-js/app-democracy';
export default function create(t) {
  return {
    Component,
    display: {
      needsApi: ['tx.democracy.notePreimage']
    },
    group: 'governance',
    icon: 'calendar-check',
    name: 'democracy',
    text: t('nav.democracy', 'Democracy', {
      ns: 'apps-routing'
    }),
    useCounter
  };
}