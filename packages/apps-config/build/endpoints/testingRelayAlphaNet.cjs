"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAlphaNet = createAlphaNet;

var _constants = require("../api/constants.cjs");

// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable sort-keys */
// The available endpoints that will show in the dropdown. For the most part (with the exception of
// AXIA) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../ui/logos/index.ts in namedLogos (this also needs to align with @axia-js/networks)
//   text: The text to display on the dropdown
//   value: The actual hosted secure websocket endpoint
// Based on history, this will expand so keep it as a singular chunk
function createAlphaNet(t) {
  return {
    dnslink: 'alphanet',
    genesisHash: _constants.ALPHANET_GENESIS,
    info: 'alphanet',
    text: t('rpc.alphanet', 'AlphaNet', {
      ns: 'apps-config'
    }),
    providers: {
      AXIA: 'wss://alphanet-rpc.axia.io',
      'Patract Elara': 'wss://pub.elara.patract.io/alphanet',
      OnFinality: 'wss://alphanet.api.onfinality.io/public-ws',
      Pinknode: 'wss://rpc.pinknode.io/alphanet/explorer',
      'light client': 'light://substrate-connect/alphanet' // 'NodeFactory(Vedran)': 'wss://alphanet.vedran.nodefactory.io/ws', // https://github.com/axia-js/apps/issues/5580

    },
    teleport: [1000],
    linked: [// (1) system allychains (none available yet)
    // ...
    // (2) common good, leave as second group
    {
      info: 'westmint',
      allyId: 1000,
      text: t('rpc.alphanet.shell', 'Westmint', {
        ns: 'apps-config'
      }),
      providers: {
        AXIA: 'wss://westmint-rpc.axia.io',
        'Patract Elara': 'wss://pub.elara.patract.io/westmint'
      },
      teleport: [-1]
    }, // (3) allychains with id, see BetaNet (info here maps to the actual "named icon")
    //
    // NOTE: Added alphabetical based on chain name
    {
      info: 'basilisk',
      allyId: 2097,
      text: t('rpc.alphanet.basilisk', 'Basilisk Egg', {
        ns: 'apps-config'
      }),
      providers: {
        HydraDX: 'wss://rpc-01.basilisk-testnet.hydradx.io'
      }
    }, {
      info: 'charcoal',
      allyId: 2086,
      text: t('rpc.alphanet.charcoal', 'Charcoal', {
        ns: 'apps-config'
      }),
      providers: {
        Centrifuge: 'wss://fullnode-collator.charcoal.centrifuge.io'
      }
    }, {
      info: 'integritee',
      allyId: 2081,
      text: t('rpc.alphanet.integritee', 'Integritee Network', {
        ns: 'apps-config'
      }),
      providers: {
        Integritee: 'wss://teerw1.integritee.network'
      }
    }, {
      info: 'interBTC',
      allyId: 2094,
      text: t('rpc.alphanet.interbtc', 'InterBTC', {
        ns: 'apps-config'
      }),
      providers: {
        Interlay: 'wss://api-alphanet.interlay.io/allychain'
      }
    }, {
      info: 'moonshadow',
      isUnreachable: true,
      // https://github.com/axia-js/apps/issues/6181
      allyId: 2002,
      text: t('rpc.alphanet.moonshadow', 'Moonshadow', {
        ns: 'apps-config'
      }),
      providers: {
        PureStake: 'wss://wss.moonshadow.testnet.axtend.network'
      }
    }, {
      info: 'alphanetStandard',
      allyId: 2094,
      text: t('rpc.alphanet.standard', 'Standard ', {
        ns: 'apps-config'
      }),
      providers: {
        'Standard Protocol': 'wss://rpc.alphanet.standard.tech'
      }
    }, {
      info: 'karura',
      isUnreachable: true,
      // https://github.com/axia-js/apps/issues/5830
      allyId: 2005,
      text: t('rpc.alphanet.wendala', 'Wendala', {
        ns: 'apps-config'
      }),
      providers: {
        'Acala Foundation': 'wss://karura-alphanet-rpc.aca-staging.network'
      }
    }, {
      info: 'whala',
      isUnreachable: true,
      // https://github.com/axia-js/apps/issues/6181
      allyId: 2013,
      text: t('rpc.alphanet.whala', 'Whala', {
        ns: 'apps-config'
      }),
      providers: {
        Phala: 'wss://whala.phala.network/ws'
      }
    }, {
      info: 'kilt',
      homepage: 'https://www.kilt.io/',
      allyId: 2085,
      text: t('rpc.alphanet.kilt', 'WILT', {
        ns: 'apps-config'
      }),
      providers: {
        'KILT Protocol': 'wss://alphanet.kilt.io:9977'
      }
    }]
  };
}