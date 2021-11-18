// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { EndpointOption } from './types';

import { BETANET_GENESIS } from '../api/constants';

/* eslint-disable sort-keys */

// The available endpoints that will show in the dropdown. For the most part (with the exception of
// AXIA) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../ui/logos/index.ts in namedLogos (this also needs to align with @axia-js/networks)
//   text: The text to display on the dropdown
//   value: The actual hosted secure websocket endpoint

// Based on history, this will expand so keep it as a singular chunk
export function createBetaNet (t: TFunction): EndpointOption {
  return {
    dnslink: 'betanet',
    genesisHash: BETANET_GENESIS,
    info: 'betanet',
    text: t('rpc.betanet', 'BetaNet', { ns: 'apps-config' }),
    providers: {
      Parity: 'wss://betanet-rpc.axia.io'
      // OnFinality: 'wss://betanet.api.onfinality.io/public-ws', // After reset, node misses host functions
      // 'Patract Elara': 'wss://pub.elara.patract.io/betanet', // After reset node is not available
      // Pinknode: 'wss://rpc.pinknode.io/betanet/explorer' // After reset, syncs to old chain
      // 'Ares Protocol': 'wss://betanet.aresprotocol.com' // https://github.com/axia-js/apps/issues/5767
    },
    linked: [
      // these are the base chains
      {
        info: 'betanetTick',
        paraId: 100,
        text: t('rpc.betanet.tick', 'Tick', { ns: 'apps-config' }),
        providers: {
          Parity: 'wss://tick-rpc.axia.io'
        }
      },
      {
        info: 'betanetTrick',
        paraId: 110,
        text: t('rpc.betanet.trick', 'Trick', { ns: 'apps-config' }),
        providers: {
          Parity: 'wss://trick-rpc.axia.io'
        }
      },
      {
        info: 'betanetTrack',
        paraId: 120,
        text: t('rpc.betanet.track', 'Track', { ns: 'apps-config' }),
        providers: {
          Parity: 'wss://track-rpc.axia.io'
        }
      },
      {
        info: 'betanetStatemint',
        paraId: 1000,
        text: t('rpc.betanet.statemint', 'Statemint', { ns: 'apps-config' }),
        providers: {
          Parity: 'wss://statemint-betanet-rpc.parity.io'
        }
      },
      // add any additional allychains here, alphabetical
      {
        info: 'betanetApron',
        isDisabled: true, // BetaNet reset
        paraId: 2048,
        text: t('rpc.betanet.apron', 'Apron PC1', { ns: 'apps-config' }),
        providers: {
          'Apron Network': 'wss://betanet.apron.network'
        }
      },
      {
        info: 'betanetAres',
        isDisabled: true, // BetaNet reset
        paraId: 1006,
        text: t('rpc.betanet.ares', 'Ares PC1', { ns: 'apps-config' }),
        providers: {
          'Ares Protocol': 'wss://betanet.allychain.aresprotocol.com'
        }
      },
      {
        info: 'betanetBifrost',
        isDisabled: true, // BetaNet reset
        paraId: 1024,
        text: t('rpc.betanet.bifrost', 'Bifrost PC1', { ns: 'apps-config' }),
        providers: {
          Bifrost: 'wss://betanet-1.testnet.liebi.com'
        }
      },
      {
        info: 'betanetBitCountry',
        isDisabled: true, // BetaNet reset
        paraId: 1008,
        text: t('rpc.betanet.bitcountry', 'Bit.Country PC1', { ns: 'apps-config' }),
        providers: {
          BitCountry: 'wss://tewai-allychain.bit.country:9955'
        }
      },
      {
        info: 'betanetClover',
        isDisabled: true, // BetaNet reset
        paraId: 229,
        text: t('rpc.betanet.clover', 'Clover PC1', { ns: 'apps-config' }),
        providers: {
          Clover: 'wss://api-betanet.clover.finance'
        }
      },
      {
        info: 'betanetCrab',
        isDisabled: true, // BetaNet reset
        paraId: 9,
        text: t('rpc.betanet.crab', 'Darwinia Crab PC2', { ns: 'apps-config' }),
        providers: {
          Darwinia: 'wss://crab-pc2-rpc.darwinia.network'
        }
      },
      {
        info: 'betanetCrust',
        isDisabled: true, // BetaNet reset
        paraId: 2001,
        text: t('rpc.betanet.crust', 'Crust PC1', { ns: 'apps-config' }),
        providers: {
          Crust: 'wss://api-betanet.crust.network'
        }
      },
      {
        info: 'betanetChainX',
        isDisabled: true, // BetaNet reset
        paraId: 1059,
        text: t('rpc.betanet.chainx', 'ChainX PC1', { ns: 'apps-config' }),
        providers: {
          ChainX: 'wss://sherpax.chainx.org'
        }
      },
      {
        info: 'betanetDarwinia',
        isDisabled: true, // BetaNet reset
        paraId: 18,
        text: t('rpc.betanet.darwinia', 'Darwinia PC2', { ns: 'apps-config' }),
        providers: {
          Darwinia: 'wss://pc2-rpc.darwinia.network'
        }
      },
      {
        info: 'betanetDataHighway',
        isDisabled: true, // BetaNet reset
        paraId: 2,
        text: t('rpc.betanet.datahighway', 'DataHighway', { ns: 'apps-config' }),
        providers: {
          DataHighway: 'wss://spreehafen.datahighway.com'
        }
      },
      {
        info: 'betanetEave',
        isDisabled: true, // BetaNet reset
        paraId: 2003,
        text: t('rpc.betanet.eave', 'Steam PC', { ns: 'apps-config' }),
        providers: {
          EAVE: 'wss://steamcollator.eave.network'
        }
      },
      {
        info: 'betanetEncointer',
        isDisabled: true, // BetaNet reset
        paraId: 1862,
        text: t('rpc.betanet.encointer', 'Encointer PC1', { ns: 'apps-config' }),
        providers: {
          Encointer: 'wss://betanet.encointer.org'
        }
      },
      {
        info: 'betanetGalital',
        isDisabled: true, // BetaNet reset
        paraId: 1230,
        text: t('rpc.betanet.galital', 'Galital PC1', { ns: 'apps-config' }),
        providers: {
          StarkleyTech: 'wss://galital-rpc.starkleytech.com'
        }
      },
      {
        info: 'betanetGenshiro',
        isDisabled: true, // BetaNet reset
        paraId: 2021,
        text: t('rpc.betanet.genshiro', 'Genshiro', { ns: 'apps-config' }),
        providers: {
          Equilibrium: 'wss://gens-betanet.equilibrium.io'
        }
      },
      {
        info: 'betanetHalongbay',
        isDisabled: true, // BetaNet reset
        paraId: 2018,
        text: t('rpc.betanet.halongbay', 'Halongbay', { ns: 'apps-config' }),
        providers: {
          Halongbay: 'wss://halongbay.polkafoundry.com'
        }
      },
      {
        info: 'betanetHydrate',
        isDisabled: true, // BetaNet reset
        paraId: 82406,
        text: t('rpc.betanet.hydrate', 'Hydrate', { ns: 'apps-config' }),
        providers: {
          HydraDX: 'wss://hydrate-rpc.hydradx.io:9944'
        }
      },
      {
        info: 'betanetIdavoll',
        isDisabled: true, // BetaNet reset
        paraId: 7766,
        text: t('rpc.betanet.idavoll', 'Idavoll', { ns: 'apps-config' }),
        providers: {
          Idavoll: 'wss://betanet.idavoll.network'
        }
      },
      {
        info: 'betanetIntegritee',
        isDisabled: true, // BetaNet reset
        paraId: 1983,
        text: t('rpc.betanet.integritee', 'Integritee PC1', { ns: 'apps-config' }),
        providers: {
          SCS: 'wss://betanet.integritee.network'
        }
      },
      {
        info: 'betanetInterBTC',
        isDisabled: true, // BetaNet reset
        paraId: 2088,
        text: t('rpc.betanet.interbtc', 'InterBTC PC1', { ns: 'apps-config' }),
        providers: {
          Interlay: 'wss://api-betanet.interlay.io/allychain'
        }
      },
      {
        info: 'betanetKilt',
        isDisabled: true, // BetaNet reset
        paraId: 12623,
        text: t('rpc.betanet.kilt', 'KILT PC1', { ns: 'apps-config' }),
        providers: {
          'KILT Protocol': 'wss://para.betanet-v1.kilt.io'
        }
      },
      {
        info: 'betanetKonomi',
        isDisabled: true, // BetaNet reset
        paraId: 18403,
        text: t('rpc.betanet.konomi', 'Komomi Network', { ns: 'apps-config' }),
        providers: {
          'Konomi Network': 'wss://betanet.konomi.tech'
        }
      },
      {
        info: 'betanetKylin',
        isDisabled: true, // BetaNet reset
        paraId: 2013,
        text: t('rpc.kylin-node.co.uk', 'Kylin Network', { ns: 'apps-config' }),
        providers: {
          'Kylin Network': 'wss://rpc.kylin-node.co.uk'
        }
      },
      {
        info: 'betanetSingLavender',
        isDisabled: true, // BetaNet reset
        paraId: 2104,
        text: t('rpc.betanet.singlavender', 'Lavender by SingNetwork', { ns: 'apps-config' }),
        providers: {
          SingNetwork: 'wss://rpc-lavender.singnetwork.io'
        }
      },
      {
        info: 'betanetLitentry',
        isDisabled: true, // BetaNet reset
        paraId: 1984,
        text: t('rpc.rocco.litentry', 'Litentry Rostock', { ns: 'apps-config' }),
        providers: {
          Litentry: 'wss://betanetv1.litentry.io'
        }
      },
      {
        info: 'betanetLoomNetwork',
        isDisabled: true, // BetaNet reset
        paraId: 2043,
        text: t('rpc.betanet.loomnetwork', 'Loom Network', { ns: 'apps-config' }),
        providers: {
          LoomNetwork: 'wss://betanet.dappchains.com'
        }
      },
      {
        info: 'betanetAcala',
        isDisabled: true, // BetaNet reset
        paraId: 1000,
        text: t('rpc.betanet.acala', 'Mandala PC2', { ns: 'apps-config' }),
        providers: {
          Acala: 'wss://betanet-1.acala.laminar.one'
        }
      },
      {
        info: 'betanetMathChain',
        isDisabled: true, // BetaNet reset
        paraId: 40,
        text: t('rpc.betanet.mathchain', 'MathChain PC1', { ns: 'apps-config' }),
        providers: {
          MathWallet: 'wss://testpara.maiziqianbao.net/ws'
        }
      },
      {
        info: 'betanetManta',
        isDisabled: true, // BetaNet reset
        paraId: 2021,
        text: t('rpc.betanet.manta', 'Manta PC1', { ns: 'apps-config' }),
        providers: {
          Manta: 'wss://betanet.manta.network'
        }
      },
      {
        info: 'betanetMoonrock',
        isDisabled: true, // BetaNet reset
        paraId: 1286,
        text: t('rpc.betanet.moonrock', 'Moonrock', { ns: 'apps-config' }),
        providers: {
          Moonrock: 'wss://wss-moonrock.gcp.purestake.run'
        }
      },
      {
        info: 'betanetOriginTrail',
        isDisabled: true, // BetaNet reset
        paraId: 2037,
        text: t('rpc.betanet.origintrail', 'OriginTrail Allychain', { ns: 'apps-config' }),
        providers: {
          'Trace Labs': 'wss://axia-js-second.origin-trail.network'
        }
      },
      {
        info: 'betanetParami',
        isDisabled: true, // BetaNet reset
        paraId: 18888,
        text: t('rpc.betanet.parami', 'Parami PC2', { ns: 'apps-config' }),
        providers: {
          Parami: 'wss://betanet.parami.io'
        }
      },
      {
        info: 'betanetJupiter',
        isDisabled: true, // BetaNet reset
        paraId: 1010,
        text: t('rpc.betanet.jupiter', 'Patract Jupiter PC1', { ns: 'apps-config' }),
        providers: {
          jupiter: 'wss://ws.betanet.jupiter.patract.cn'
        }
      },
      {
        info: 'betanetPhala',
        isDisabled: true, // BetaNet reset
        paraId: 1030,
        text: t('rpc.betanet.phala', 'Phala PC1', { ns: 'apps-config' }),
        providers: {
          Phala: 'wss://betanetv1.phala.network/ws'
        }
      },
      {
        info: 'betanetPhoenix',
        isDisabled: true, // BetaNet reset
        paraId: 6806,
        text: t('rpc.betanet.phoenix', 'PHOENIX PC1', { ns: 'apps-config' }),
        providers: {
          'PHOENIX Protocol': 'wss://phoenix-ws.coinid.pro'
        }
      },
      {
        info: 'betanetPlasm',
        isDisabled: true, // BetaNet reset
        paraId: 5000,
        text: t('rpc.betanet.plasm', 'Plasm PC2', { ns: 'apps-config' }),
        providers: {
          PlasmNetwork: 'wss://rpc.betanet.plasmnet.io'
        }
      },
      {
        info: 'betanetPolkaFoundry',
        isDisabled: true, // BetaNet reset
        paraId: 1111,
        text: t('rpc.betanet.polkafoundry', 'PolkaFoundry PC1', { ns: 'apps-config' }),
        providers: {
          PolkaFoundry: 'wss://betanet.polkafoundry.com'
        }
      },
      {
        info: 'betanetPrism',
        isDisabled: true, // BetaNet reset
        paraId: 2002,
        text: t('rpc.betanet.prism', 'Prism PC1', { ns: 'apps-config' }),
        providers: {
          Prism: 'wss://betanet.psm.link'
        }
      },
      {
        info: 'betanetRobonomics',
        isDisabled: true, // BetaNet reset
        paraId: 3000,
        text: t('rpc.betanet.robonomics', 'Robonomics PC2', { ns: 'apps-config' }),
        providers: {
          Airalab: 'wss://betanet.allychain.robonomics.network'
        }
      },
      {
        info: 'betanetStandard',
        isDisabled: true,
        paraId: 2003,
        text: t('rpc.betanet.standard', 'Standard', { ns: 'apps-config' }),
        providers: {
          'Standard Protocol': 'wss://rpc.betanet.standard.tech'
        }
      },
      {
        info: 'betanetSubDAO',
        isDisabled: true, // BetaNet reset
        paraId: 888,
        text: t('rpc.betanet.subdao', 'SubDAO PC1', { ns: 'apps-config' }),
        providers: {
          SubDAONetwork: 'wss://allychain.subdao.network'
        }
      },
      {
        info: 'betanetSubsocial',
        isDisabled: true, // BetaNet reset
        paraId: 28,
        text: t('rpc.betanet.subsocial', 'Subsocial PC1', { ns: 'apps-config' }),
        providers: {
          DappForce: 'wss://roc.subsocial.network'
        }
      },
      {
        info: 'betanetTrustBase',
        isDisabled: true, // BetaNet reset
        paraId: 6633,
        text: t('rpc.betanet.trustbase', 'TrustBase PC1', { ns: 'apps-config' }),
        providers: {
          TrustBase: 'wss://betanet.trustednodes.net'
        }
      },
      {
        info: 'betanetUnitv',
        isDisabled: true, // BetaNet reset
        paraId: 3,
        text: t('rpc.betanet.unitv', 'Unit Network', { ns: 'apps-config' }),
        providers: {
          'Unit Network': 'wss://unitp.io'
        }
      },
      {
        info: 'betanetVln',
        isDisabled: true, // BetaNet reset
        paraId: 2007,
        text: t('rpc.betanet.vln', 'Valibre Network PC', { ns: 'apps-config' }),
        providers: {
          Valibre: 'wss://testnet.valibre.dev'
        }
      },
      {
        info: 'betanetZeitgeist',
        isDisabled: true, // See https://github.com/axia-js/apps/issues/5842
        paraId: 2050,
        text: t('rpc.betanet.zeitgeist', 'Zeitgeist PC', { ns: 'apps-config' }),
        providers: {
          Zeitgeist: 'wss://roc.zeitgeist.pm'
        }
      },
      {
        info: 'betanetZenlink',
        isDisabled: true, // BetaNet reset
        paraId: 1188,
        text: t('rpc.betanet.zenlink', 'Zenlink PC1', { ns: 'apps-config' }),
        providers: {
          Zenlink: 'wss://betanet-allychain.zenlink.pro'
        }
      }
    ]
  };
}
