// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@axia-js/app-parachains';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: [
        // children - parachainInfo.arachainId / parachainUpgrade.didSetValidationCode
        ['query.paras.parachains']
      ]
    },
    group: 'network',
    icon: 'link',
    name: 'parachains',
    text: t('nav.parachains', 'Parachains', { ns: 'apps-routing' })
  };
}
