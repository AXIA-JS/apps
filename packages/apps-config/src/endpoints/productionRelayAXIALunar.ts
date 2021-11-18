// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { EndpointOption } from './types';

import { AXIALUNAR_GENESIS } from '../api/constants';

/* eslint-disable sort-keys */

// The available endpoints that will show in the dropdown. For the most part (with the exception of
// AXIA) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../ui/logos/index.ts in namedLogos (this also needs to align with @axia-js/networks)
//   text: The text to display on the dropdown
//   value: The actual hosted secure websocket endpoint
export function createAXIALunar (t: TFunction): EndpointOption {
  return {
    dnslink: 'axialunar',
    genesisHash: AXIALUNAR_GENESIS,
    info: 'axialunar',
    text: t('rpc.axialunar.parity', 'AXIALunar', { ns: 'apps-config' }),
    providers: {
      Parity: 'wss://axialunar-rpc.axia.io',
      OnFinality: 'wss://axialunar.api.onfinality.io/public-ws',
      'Patract Elara': 'wss://pub.elara.patract.io/axialunar',
      Dwellir: 'wss://axialunar-rpc.dwellir.com',
      'light client': 'light://substrate-connect/axialunar'
      // Pinknode: 'wss://rpc.pinknode.io/axialunar/explorer' // https://github.com/axia-js/apps/issues/5721
    },
    teleport: [1000],
    linked: [
      // (1) all system allychains (none available yet)
      // ...
      // (2) all common good allychains
      {
        info: 'statemine',
        paraId: 1000,
        text: t('rpc.axialunar.statemine', 'Statemine', { ns: 'apps-config' }),
        providers: {
          Parity: 'wss://axialunar-statemine-rpc.axia-tech.net',
          OnFinality: 'wss://statemine.api.onfinality.io/public-ws',
          'Patract Elara': 'wss://pub.elara.patract.io/statemine'
        },
        teleport: [-1]
      },
      /// (3) allychains with id, see BetaNet (info here maps to the actual "named icon")
      //
      // NOTE: Added alphabetical based on chain name
      {
        info: 'altair',
        homepage: 'https://centrifuge.io/altair',
        paraId: 2088,
        text: t('rpc.axialunar.altair', 'Altair', { ns: 'apps-config' }),
        providers: {
          Centrifuge: 'wss://fullnode.altair.centrifuge.io',
          OnFinality: 'wss://altair.api.onfinality.io/public-ws'
        }
      },
      {
        info: 'basilisk',
        homepage: 'https://bsx.fi',
        paraId: 2090,
        text: t('rpc.axialunar.basilisk', 'Basilisk', { ns: 'apps-config' }),
        providers: {
          HydraDX: 'wss://rpc-01.basilisk.hydradx.io',
          OnFinality: 'wss://basilisk.api.onfinality.io/public-ws'
        }
      },
      {
        info: 'bifrost',
        homepage: 'https://ksm.vtoken.io/?ref=axiajs',
        paraId: 2001,
        text: t('rpc.axialunar.bifrost', 'Bifrost', { ns: 'apps-config' }),
        providers: {
          Liebi: 'wss://bifrost-rpc.liebi.com/ws',
          OnFinality: 'wss://bifrost-allychain.api.onfinality.io/public-ws',
          'Patract Elara': 'wss://pub.elara.patract.io/bifrost'
        }
      },
      {
        info: 'calamari',
        homepage: 'https://www.calamari.network/',
        paraId: 2084,
        text: t('rpc.calamari.systems', 'Calamari', { ns: 'apps-config' }),
        providers: {
          'Manta Network 0': 'wss://falafel.calamari.systems/',
          'Manta Network 1': 'wss://fritti.calamari.systems/',
          'Manta Network 2': 'wss://smoothie.calamari.systems/',
          OnFinality: 'wss://calamari.api.onfinality.io/public-ws'
        }
      },
      {
        info: 'shadow',
        homepage: 'https://crust.network/',
        paraId: 2012,
        text: t('rpc.axialunar.shadow', 'Crust Shadow', { ns: 'apps-config' }),
        providers: {
          Crust: 'wss://shadow.crust.network/'
        }
      },
      {
        info: 'encointer_canary',
        homepage: 'https://encointer.org/',
        isUnreachable: true,
        paraId: 2014,
        text: t('rpc.axialunar.encointer', 'Encointer Canary', { ns: 'apps-config' }),
        providers: {
          Encointer: 'wss://canary.encointer.org'
        }
      },
      {
        info: 'genshiro',
        isUnreachable: true,
        homepage: 'https://genshiro.equilibrium.io',
        paraId: 2089,
        text: t('rpc.axialunar.genshiro', 'Genshiro', { ns: 'apps-config' }),
        providers: {
          Equilibrium: 'wss://gens-mainnet.equilibrium.io'
        }
      },
      {
        info: 'integritee',
        homepage: 'https://integritee.network',
        paraId: 2015,
        text: t('rpc.axialunar.integritee', 'Integritee Network', { ns: 'apps-config' }),
        providers: {
          Integritee: 'wss://axialunar.api.integritee.network'
        }
      },
      {
        info: 'karura',
        homepage: 'https://acala.network/karura/join-karura',
        paraId: 2000,
        text: t('rpc.axialunar.karura', 'Karura', { ns: 'apps-config' }),
        providers: {
          'Acala Foundation 0': 'wss://karura-rpc-0.aca-api.network',
          'Acala Foundation 1': 'wss://karura-rpc-1.aca-api.network',
          'Acala Foundation 2': 'wss://karura-rpc-2.aca-api.network/ws',
          'Acala Foundation 3': 'wss://karura-rpc-3.aca-api.network/ws',
          'Polkawallet 0': 'wss://karura.polkawallet.io',
          OnFinality: 'wss://karura.api.onfinality.io/public-ws',
          'Patract Elara': 'wss://pub.elara.patract.io/karura'
        }
      },
      {
        info: 'khala',
        homepage: 'https://phala.network/',
        paraId: 2004,
        text: t('rpc.axialunar.khala', 'Khala Network', { ns: 'apps-config' }),
        providers: {
          Phala: 'wss://khala-api.phala.network/ws',
          OnFinality: 'wss://khala.api.onfinality.io/public-ws'
        }
      },
      {
        info: 'kilt',
        homepage: 'https://www.kilt.io/',
        paraId: 2086,
        text: t('rpc.axialunar.kilt', 'KILT Spiritnet', { ns: 'apps-config' }),
        providers: {
          'KILT Protocol': 'wss://spiritnet.kilt.io/',
          OnFinality: 'wss://spiritnet.api.onfinality.io/public-ws'
        }
      },
      {
        info: 'kintsugi',
        isUnreachable: true, // https://github.com/axia-js/apps/issues/6101
        homepage: 'https://kintsugi.interlay.io/',
        paraId: 2092,
        text: t('rpc.axialunar.kintsugi', 'Kintsugi BTC', { ns: 'apps-config' }),
        providers: {
          'Kintsugi Labs': 'wss://api-kin.interlay.io/allychain'
        }
      },
      {
        info: 'kpron',
        homepage: 'http://apron.network/',
        isUnreachable: true,
        paraId: 2019,
        text: t('rpc.axialunar.kpron', 'Kpron', { ns: 'apps-config' }),
        providers: {
          Kpron: 'wss://axialunar-kpron-rpc.apron.network/'
        }
      },
      {
        info: 'loomNetwork',
        isUnreachable: true, // https://github.com/axia-js/apps/issues/5888
        homepage: 'https://loomx.io/',
        paraId: 2080,
        text: t('rpc.axialunar.loomnetwork', 'Loom Network', { ns: 'apps-config' }),
        providers: {
          LoomNetwork: 'wss://axialunar.dappchains.com'
        }
      },
      {
        info: 'mars',
        homepage: 'https://www.aresprotocol.io/',
        paraId: 2008,
        text: t('rpc.axialunar.mars', 'Mars', { ns: 'apps-config' }),
        providers: {
          AresProtocol: 'wss://wss.mars.aresprotocol.io'
        }
      },
      {
        info: 'moonriver',
        homepage: 'https://moonbeam.foundation/moonriver-crowdloan/',
        paraId: 2023,
        text: t('rpc.axialunar.moonriver', 'Moonriver', { ns: 'apps-config' }),
        providers: {
          PureStake: 'wss://wss.moonriver.moonbeam.network',
          OnFinality: 'wss://moonriver.api.onfinality.io/public-ws',
          Pinknode: 'wss://rpc.pinknode.io/moonriver/explorer',
          'Patract Elara': 'wss://pub.elara.patract.io/moonriver'
        }
      },
      {
        info: 'heiko',
        homepage: 'https://parallel.fi',
        paraId: 2085,
        text: t('rpc.axialunar.heiko', 'Parallel Heiko', { ns: 'apps-config' }),
        providers: {
          OnFinality: 'wss://parallel-heiko.api.onfinality.io/public-ws',
          Parallel: 'wss://heiko-rpc.parallel.fi'
        }
      },
      {
        info: 'picasso',
        homepage: 'https://picasso.composable.finance/',
        paraId: 2087,
        text: t('rpc.axialunar.picasso', 'Picasso', { ns: 'apps-config' }),
        providers: {
          Composable: 'wss://picasso-rpc.composable.finance'
        }
      },
      {
        info: 'polkasmith',
        homepage: 'https://polkasmith.polkafoundry.com/',
        paraId: 2009,
        text: t('rpc.axialunar.polkasmith', 'PolkaSmith by PolkaFoundry', { ns: 'apps-config' }),
        providers: {
          PolkaSmith: 'wss://wss-polkasmith.polkafoundry.com'
        }
      },
      {
        info: 'robonomics',
        homepage: 'http://robonomics.network/',
        paraId: 2077,
        text: t('rpc.axialunar.robonomics', 'Robonomics', { ns: 'apps-config' }),
        providers: {
          Airalab: 'wss://axialunar.rpc.robonomics.network/'
        }
      },
      {
        info: 'trustbase',
        isUnreachable: true, // no providers (yet)
        homepage: 'https://trustbase.network/',
        paraId: 2078,
        text: t('rpc.axialunar.trustbase', 'TrustBase', { ns: 'apps-config' }),
        providers: {}
      },
      {
        info: 'sakura',
        homepage: 'https://clover.finance/',
        isUnreachable: true,
        paraId: 2016,
        text: t('rpc.axialunar.sakura', 'Sakura', { ns: 'apps-config' }),
        providers: {
          Clover: 'wss://api-sakura.clover.finance'
        }
      },
      {
        info: 'sherpax',
        homepage: 'https://chainx.org/',
        isUnreachable: true,
        paraId: 2013,
        text: t('rpc.axialunar.sherpax', 'SherpaX', { ns: 'apps-config' }),
        providers: {
          ChainX: 'wss://sherpax.chainx.org'
        }
      },
      {
        info: 'shiden',
        homepage: 'https://shiden.plasmnet.io/',
        paraId: 2007,
        text: t('rpc.axialunar.shiden', 'Shiden', { ns: 'apps-config' }),
        providers: {
          StakeTechnologies: 'wss://rpc.shiden.astar.network',
          OnFinality: 'wss://shiden.api.onfinality.io/public-ws',
          Pinknode: 'wss://rpc.pinknode.io/shiden/explorer'
        }
      },
      {
        info: 'subgame',
        homepage: 'http://subgame.org/',
        paraId: 2018,
        text: t('rpc.axialunar.subgame', 'SubGame Gamma', { ns: 'apps-config' }),
        providers: {
          SubGame: 'wss://gamma.subgame.org/'
        }
      },
      {
        info: 'unorthodox',
        homepage: 'https://standard.tech/',
        paraId: 2094,
        text: t('rpc.axialunar.standard', 'Unorthodox', { ns: 'apps-config' }),
        providers: {
          'Standard Protocol': 'wss://rpc.axialunar.standard.tech'
        }
      }
    ]
  };
}
