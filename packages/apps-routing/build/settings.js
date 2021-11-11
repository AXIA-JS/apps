// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Component, { useCounter } from '@axia-js/app-settings';
export default function create(t) {
  return {
    Component,
    display: {},
    group: 'settings',
    icon: 'cogs',
    name: 'settings',
    text: t('nav.settings', 'Settings', {
      ns: 'apps-routing'
    }),
    useCounter
  };
}