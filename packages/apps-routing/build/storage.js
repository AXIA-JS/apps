// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Component from '@axia-js/app-storage';
export default function create(t) {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'developer',
    icon: 'database',
    name: 'chainstate',
    text: t('nav.storage', 'Chain state', {
      ns: 'apps-routing'
    })
  };
}