// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Component, { useCounter } from '@axia-js/app-council';
export default function create(t) {
  return {
    Component,
    display: {
      needsApi: ['query.council.prime'],
      needsApiInstances: true
    },
    group: 'governance',
    icon: 'building',
    name: 'council',
    text: t('nav.council', 'Council', {
      ns: 'apps-routing'
    }),
    useCounter
  };
}