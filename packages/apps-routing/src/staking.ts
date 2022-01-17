// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@axia-js/app-staking';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: [
        ['tx.staking.bond']
      ]
    },
    group: 'network',
    icon: 'database',
    name: 'staking',
    text: t('nav.staking', 'Staking', { ns: 'apps-routing' })
  };
}
