// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@axia-js/app-assets';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: [
        'tx.assets.setMetadata',
        'tx.assets.transferKeepAlive'
      ]
    },
    group: 'network',
    icon: 'shopping-basket',
    name: 'assets',
    text: t('nav.assets', 'Assets', { ns: 'apps-routing' })
  };
}
