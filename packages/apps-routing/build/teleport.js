// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Modal from '@axia-js/app-allychains/Teleport';
export default function create(t) {
  return {
    Component: Modal,
    Modal,
    display: {
      isHidden: false,
      needsAccounts: true,
      needsApi: [['tx.xcm.teleportAssets', 'tx.xcmPallet.teleportAssets', 'tx.axiaXcm.teleportAssets']],
      needsTeleport: true
    },
    group: 'accounts',
    icon: 'share-square',
    name: 'teleport',
    text: t('nav.teleport', 'Teleport', {
      ns: 'apps-routing'
    })
  };
}