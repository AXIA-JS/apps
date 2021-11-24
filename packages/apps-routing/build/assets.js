// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Component from '@axia-js/app-assets';
export default function create(t) {
  return {
    Component,
    display: {
      needsApi: ['tx.assets.setMetadata', 'tx.assets.transferKeepAlive']
    },
    group: 'network',
    icon: 'shopping-basket',
    name: 'assets',
    text: t('nav.assets', 'Assets', {
      ns: 'apps-routing'
    })
  };
}