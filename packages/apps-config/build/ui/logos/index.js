import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint sort-keys: ["error", "asc", { caseSensitive: false }] */
// The mapping here is done on the actual chain name (system.chain RPC) or
// the actual RPC node it is corrected to (system.name RPC)
// anything for a specific chain, most would probably fit into the node category (but allow for chain-specific)
// alphabetical
import { sanitize } from "../util.js";
import chainAleph from "./chains/aleph.svg";
import chainAltair from "./chains/altair.svg";
import chainCrownSterling from "./chains/crown-sterling.png";
import chainDusty from "./chains/dusty.png";
import chainEquilibrium from "./chains/equilibrium.svg";
import chainGenshiro from "./chains/genshiro.svg";
import chainHeiko from "./chains/heiko.svg";
import chainHydrate from "./chains/hydrate.png";
import chainInterBTC from "./chains/interbtc.png";
import chainKarura from "./chains/karura.svg";
import chainKintsugi from "./chains/kintsugi.png";
import chainAXIALunar from "./chains/axialunar-128.gif";
import chainComposable from "./chains/picasso.svg";
import chainBetaNet from "./chains/betanet.svg";
import chainBetaNetTick from "./chains/betanet-tick.svg";
import chainBetaNetTrack from "./chains/betanet-track.svg";
import chainBetaNetTrick from "./chains/betanet-trick.svg";
import chainShiden from "./chains/shiden.png";
import chainSnakenet from "./chains/snakenet.svg";
import chainSpanner from "./chains/spanner.png";
import chainStandard from "./chains/standard.png";
import chainUnique from "./chains/unique.svg";
import chainUnorthodox from "./chains/unorthodox.png";
import extensionAXIAJs from "./extensions/axia-js.svg";
import externalCommonwealth from "./external/commonwealth.png";
import externalDotreasury from "./external/dotreasury.svg";
import externalDotScanner from "./external/dotscanner.png";
import externalPolkascan from "./external/polkascan.png";
import externalPolkassembly from "./external/polkassembly.png";
import externalPolkastats from "./external/polkastats.png";
import externalStatescan from "./external/statescan.svg";
import externalSubId from "./external/subid.svg";
import externalSubscan from "./external/subscan.svg";
import nodeAcala from "./nodes/acala-circle.svg";
import nodeApron from "./nodes/apron.png";
import nodeAres from "./nodes/ares.svg";
import nodeBasilisk from "./nodes/basilisk.png";
import nodeBeast from "./nodes/beast.svg";
import nodeBifrost from "./nodes/bifrost.svg";
import nodeBitCountry from "./nodes/bitcountry.svg";
import nodeCalamari from "./nodes/calamari.png";
import nodeCanvas from "./nodes/canvas-2.png";
import nodeCentrifuge from "./nodes/centrifuge.png";
import nodeChainx from "./nodes/chainx.svg";
import nodeClover from "./nodes/clover.svg";
import nodeCrab from "./nodes/crab.svg";
import nodeCrownSterling from "./nodes/crown-sterling.png";
import nodeCrust from "./nodes/crust.svg";
import nodeCrustMaxwell from "./nodes/crust-maxwell.svg";
import nodeDarwinia from "./nodes/darwinia.png";
import nodeDataHighway from "./nodes/datahighway.png";
import nodeDockMainnet from "./nodes/dock-mainnet.png";
import nodeDockTestnet from "./nodes/dock-testnet.png";
import nodeDotMog from "./nodes/dotmog.svg";
import nodeEave from "./nodes/eave.svg";
import nodeEdgeware from "./nodes/edgeware-circle.svg";
import nodeEncointerNotee from "./nodes/encointer-notee.svg";
import nodeEncointerTeeproxy from "./nodes/encointer-teeproxy.svg";
import nodeFantour from "./nodes/fantour.png";
import nodeGalital from "./nodes/galital-logo.png";
import nodeGamePower from "./nodes/gamepower.svg";
import nodeGeek from "./nodes/geek.svg";
import nodeHanonycash from "./nodes/hanonycash.svg";
import nodeHeiko from "./nodes/heiko.svg";
import nodeIdavoll from "./nodes/idavoll.png";
import nodeIntegritee from "./nodes/integritee.svg";
import nodeInterBTC from "./nodes/interbtc.png";
import nodeIpse from "./nodes/ipse.png";
import nodeJupiter from "./nodes/jupiter.svg";
import nodeKhala from "./nodes/khala.svg";
import nodeKilt from "./nodes/kilt.png";
import nodeKlug from "./nodes/klug.png";
import nodeKonomi from "./nodes/konomi.png";
import nodeKulupu from "./nodes/kulupu.svg";
import nodeKylin from "./nodes/kylin.png";
import nodeLaminar from "./nodes/laminar-circle.svg";
import nodeLitentry from "./nodes/litentry.png";
import nodeLoomNetwork from "./nodes/loom_network.png";
import nodeManta from "./nodes/manta.png";
import nodeMath from "./nodes/math.svg";
import axtend from "./nodes/axtend.png";
import moonriver from "./nodes/moonriver.svg";
import nodeMoonrock from "./nodes/moonrock.png";
import moonshadow from "./nodes/moonshadow.png";
import mybank from "./nodes/mybank.png";
import nodeNFTMart from "./nodes/nftmart.png";
import nodeNodle from "./nodes/nodle.svg";
import oakTestnet from "./nodes/oak-testnet.png";
import nodeOpportunity from "./nodes/opportunity.png";
import nodeOriginTrail from "./nodes/origintrail.png";
import nodePangolin from "./nodes/pangolin.svg";
import nodePangoro from "./nodes/pangoro.svg";
import nodeParami from "./nodes/parami.png";
import nodePhala from "./nodes/phala.svg";
import nodePhoenix from "./nodes/phoenix.png";
import nodePlasm from "./nodes/plasm.png";
import nodePolkadex from "./nodes/polkadex.svg";
import nodeAXIA from "./nodes/axia-circle.svg";
import nodeAXIAJs from "./nodes/axia-js.svg";
import nodePolkaFoundry from "./nodes/polkafoundry.svg";
import nodePolkaSmith from "./nodes/polkasmith.svg";
import nodePolymesh from "./nodes/polymesh.svg";
import nodePontem from "./nodes/pontem.svg";
import nodePrism from "./nodes/prism.png";
import nodeRealis from "./nodes/realis.png";
import nodeRiochain from "./nodes/riochain.svg";
import nodeRobonomics from "./nodes/robonomics.svg";
import nodeSakura from "./nodes/sakura.svg";
import nodeShadow from "./nodes/shadow.svg";
import nodeShell from "./nodes/shell.svg";
import nodeSingLavender from "./nodes/singlavender.svg";
import nodeSora from "./nodes/sora-substrate.svg";
import nodeStafi from "./nodes/stafi.png";
import nodeStatemine from "./nodes/statemine.svg";
import nodeSubDAO from "./nodes/subdao.png";
import nodeSubGame from "./nodes/subgame.svg";
import nodeSubsocial from "./nodes/subsocial.svg";
import nodeSubspace from "./nodes/subspace.png";
import nodeSubstrateContractsNode from "./nodes/substrate-contracts-node.png";
import nodeSubstrate from "./nodes/substrate-hexagon.svg";
import nodeTernoa from "./nodes/ternoa.svg";
import nodeTrustBase from "./nodes/trustbase.png";
import nodeUniarts from "./nodes/uniarts.png";
import nodeUnique from "./nodes/unique.svg";
import nodeUnitv from "./nodes/unitv.png";
import nodeVln from "./nodes/valiu.png";
import nodeWeb3games from "./nodes/web3games.svg";
import nodeAlphaNet from "./nodes/alphanet_colour.svg";
import nodeWestlake from "./nodes/westlake.png";
import nodeWhala from "./nodes/whala.svg";
import nodeZCloak from "./nodes/zCloak.svg";
import nodeZeitgeist from "./nodes/zeitgeist.png";
import nodeZenlink from "./nodes/zenlink.svg";
import nodeZero from "./nodes/zero.svg";
import emptyLogo from "./empty.svg"; // last-resort fallback, just something empty
// Alphabetical overrides based on the actual matched chain name
// NOTE: This is as retrieved via system.chain RPC

export const chainLogos = Object.entries({
  'Aleph Zero Testnet': chainAleph,
  Altair: chainAltair,
  'Apron PC1': nodeApron,
  'Ares PC1': nodeAres,
  'Beast Developer': nodeBeast,
  Bifrost: nodeBifrost,
  'Bifrost Asgard CC4': nodeBifrost,
  Calamari: nodeCalamari,
  ChainX: nodeChainx,
  'Charcoal Testnet': nodeCentrifuge,
  'Crown Sterling': chainCrownSterling,
  'Crust Maxwell': nodeCrustMaxwell,
  'Crust PC1': nodeCrust,
  'darwinia crab': nodeCrab,
  'Darwinia Crab PC2': nodeCrab,
  'Darwinia PC2': nodeDarwinia,
  DataHighway: nodeDataHighway,
  Dusty: chainDusty,
  'Encointer Canary': nodeEncointerNotee,
  'Encointer PC1': nodeEncointerNotee,
  Equilibrium: chainEquilibrium,
  EquilibriumTestnet: chainEquilibrium,
  Galital: nodeGalital,
  Galois: nodeMath,
  'GamePower Network': nodeGamePower,
  GEEK: nodeGeek,
  Genshiro: chainGenshiro,
  'Genshiro BetaNet Testnet': chainEquilibrium,
  'HydraDX Hydrate': chainHydrate,
  'HydraDX Snakenet': chainSnakenet,
  'HydraDX Snakenet Gen2': chainSnakenet,
  'HydraDX Snakenet Gen3': chainSnakenet,
  Idavoll: nodeIdavoll,
  InterBTC: nodeInterBTC,
  'InterBTC Staging': nodeInterBTC,
  IpseTestnet: nodeIpse,
  'Jupiter A1': nodeJupiter,
  'Jupiter PC1': nodeJupiter,
  Karura: chainKarura,
  KILT: nodeKilt,
  'KILT Local': nodeKilt,
  'KILT Peregrine': nodeKilt,
  'KILT Testnet': nodeKilt,
  Kintsugi: chainKintsugi,
  KlugDossier: nodeKlug,
  Konomi: nodeKonomi,
  Kpron: nodeApron,
  AXIALunar: chainAXIALunar,
  // new name after CC3
  'AXIALunar CC1': chainAXIALunar,
  'AXIALunar CC2': chainAXIALunar,
  'AXIALunar CC3': chainAXIALunar,
  'Kylin Testnet': nodeKylin,
  Litentry: nodeLitentry,
  'Loom Network Local': nodeLoomNetwork,
  LoomNetwork: nodeLoomNetwork,
  'Manta Testnet': nodeManta,
  Mars: nodeAres,
  'MathChain PC1': nodeMath,
  'Moonbase Alpha': axtend,
  'Moonbase Development Testnet': axtend,
  'Moonbase Stage': axtend,
  Moonriver: moonriver,
  Moonrock: nodeMoonrock,
  Moonshadow: moonshadow,
  'mybank.network PC1': mybank,
  'NFTMart Staging': nodeNFTMart,
  'NFTMart Testnet': nodeNFTMart,
  'OAK Testnet': oakTestnet,
  'OriginTrail Allychain': nodeOriginTrail,
  'OriginTrail Allychain Testnet': nodeOriginTrail,
  Pangolin: nodePangolin,
  Pangoro: nodePangoro,
  'Parallel Heiko': chainHeiko,
  'Parami PC2': nodeParami,
  'Phala PC1': nodePhala,
  'PHOENIX PC1': nodePhoenix,
  'Polkadex Testnet': nodePolkadex,
  'PolkaFoundry PC1': nodePolkaFoundry,
  'Pontem Testnet': nodePontem,
  'Prism PC1': nodePrism,
  'Prism Testnet': nodePrism,
  'ReAlis Network': nodeRealis,
  'RioChain CC-1': nodeRiochain,
  'RioChain Staging': nodeRiochain,
  BetaNet: chainBetaNet,
  Shiden: chainShiden,
  SingLavender: nodeSingLavender,
  Spanner: chainSpanner,
  'Spartan Testnet': nodeSubspace,
  Standard: chainStandard,
  Statemine: nodeStatemine,
  'Statemine Test': nodeStatemine,
  Statemint: nodeStatemine,
  'Statemint Test': nodeStatemine,
  'Steam PC': nodeEave,
  'SubDAO PC1': nodeSubDAO,
  subgame: nodeSubGame,
  'SubGame Gamma': nodeSubGame,
  'SubGame Staging': nodeSubGame,
  Subsocial: nodeSubsocial,
  'Subsocial PC': nodeSubsocial,
  Tick: chainBetaNetTick,
  Track: chainBetaNetTrack,
  Trick: chainBetaNetTrick,
  trustbase: nodeTrustBase,
  'TrustBase PC1': nodeTrustBase,
  'uni arts staging network': nodeUniarts,
  'UniArts Mainnet': nodeUniarts,
  Unique: chainUnique,
  'Unit Network': nodeUnitv,
  Unorthodox: chainUnorthodox,
  Vln: nodeVln,
  'VLN PC': nodeVln,
  Web3games: nodeWeb3games,
  AlphaNet: nodeAlphaNet,
  Westlake: nodeWestlake,
  Westmint: nodeStatemine,
  'Westmint Test': nodeStatemine,
  WILT: nodeKilt,
  'zcloak poc1': nodeZCloak
}).reduce((logos, [chain, logo]) => _objectSpread(_objectSpread({}, logos), {}, {
  [sanitize(chain)]: logo
}), {}); // Alphabetical overrides based on the actual software node type
// NOTE: This is as retrieved via system.name RPC

export const nodeLogos = Object.entries({
  'Acala Node': nodeAcala,
  'Apron Node': nodeApron,
  'Apron Allychain Collator': nodeApron,
  'Ares Node': nodeAres,
  'Ares Allychain Collator': nodeAres,
  Basilisk: nodeBasilisk,
  'Beast Node': nodeBeast,
  Bifrost: nodeBifrost,
  'Bifrost Node': nodeBifrost,
  'Bit Country Tewai Allychain Collator': nodeBitCountry,
  'Bit.Country': nodeBitCountry,
  'BitCountry Node': nodeBitCountry,
  'Calamari Allychain Collator': nodeCalamari,
  'Canvas Node': nodeCanvas,
  'centrifuge chain': nodeCentrifuge,
  'Centrifuge Chain Node': nodeCentrifuge,
  'ChainX Node': nodeChainx,
  'Clover Node': nodeClover,
  'Crown Sterling': nodeCrownSterling,
  crust: nodeCrust,
  'Crust Collator': nodeCrust,
  'Crust Maxwell': nodeCrustMaxwell,
  darwinia: nodeDarwinia,
  'darwinia crab': nodeCrab,
  'darwinia allychain': nodeDarwinia,
  'Darwinia Runtime Module Library': nodeDarwinia,
  DataHighway: nodeDataHighway,
  'DataHighway Node': nodeDataHighway,
  'DataHighway Allychain Collator': nodeDataHighway,
  'Dock Full Node': nodeDockMainnet,
  'DOTMog Node': nodeDotMog,
  'Eave Node': nodeEave,
  'Edgeware Node': nodeEdgeware,
  'Encointer Node': nodeEncointerNotee,
  'Encointer Node noTEE': nodeEncointerNotee,
  'Encointer Node TEE proxy': nodeEncointerTeeproxy,
  'Fantour Node': nodeFantour,
  'Galital Allychain Collator': nodeGalital,
  Galois: nodeMath,
  'GamePower Node': nodeGamePower,
  GEEK: nodeGeek,
  'Halongbay Allychain Collator': nodePolkaFoundry,
  hanonycash: nodeHanonycash,
  'Idavoll Node': nodeIdavoll,
  'Integritee Collator': nodeIntegritee,
  IpseTestnet: nodeIpse,
  Khala: nodeKhala,
  'Khala Node': nodeKhala,
  KILT: nodeKilt,
  'KILT Local': nodeKilt,
  'KILT Peregrine': nodeKilt,
  Kintsugi: chainKintsugi,
  'Klug Dossier Node': nodeKlug,
  'Kpron Collator': nodeApron,
  kulupu: nodeKulupu,
  'Kylin Node': nodeKylin,
  'Laminar Node': nodeLaminar,
  Litentry: nodeLitentry,
  'Litentry Collator': nodeLitentry,
  'mandala node': nodeAcala,
  'Manta Node': nodeManta,
  'Manta Allychain Collator': nodeManta,
  Moonrock: nodeMoonrock,
  'mybank.network': mybank,
  'NFTMart Staging': nodeNFTMart,
  'NFTMart Testnet': nodeNFTMart,
  'node-template': nodeSubstrate,
  'Nodle Chain Node': nodeNodle,
  'OAK Testnet': oakTestnet,
  'Opportunity Standalone Testnet': nodeOpportunity,
  'OriginTrail Allychain': nodeOriginTrail,
  'OriginTrail Allychain Testnet': nodeOriginTrail,
  Pangolin: nodePangolin,
  Pangoro: nodePangoro,
  'Parallel Heiko': nodeHeiko,
  Parami: nodeParami,
  'axia-axia': nodeAXIA,
  'Patract Node': nodeJupiter,
  'Phala Collator': nodePhala,
  'phala-substrate-node': nodePhala,
  'PHOENIX Collator': nodePhoenix,
  'PHOENIX Node': nodePhoenix,
  Plasm: nodePlasm,
  'Plasm Node': nodePlasm,
  'Plasm Allychain Collator': nodePlasm,
  'Polkadex Node': nodePolkadex,
  'axia-js': nodeAXIAJs,
  'PolkaFoundry Node': nodePolkaFoundry,
  'PolkaFoundry Allychain Collator': nodePolkaFoundry,
  'PolkaSmith Allychain Collator': nodePolkaSmith,
  'Pontem Testnet': nodePontem,
  'Prism Collator': nodePrism,
  'Prism Node': nodePrism,
  'ReAlis Network': nodeRealis,
  'Rio Defi Chain Node': nodeRiochain,
  'RioChain Staging': nodeRiochain,
  robonomics: nodeRobonomics,
  Sakura: nodeSakura,
  Shadow: nodeShadow,
  sherpax: nodeChainx,
  'Shiden Collator': chainShiden,
  'SingLavender Allychain Collator': nodeSingLavender,
  SORA: nodeSora,
  'Spartan Testnet': nodeSubspace,
  Stafi: nodeStafi,
  'Stafi Node': nodeStafi,
  'Statemine Collator': nodeStatemine,
  'Statemint Collator': nodeStatemine,
  'SubDAO Collator': nodeSubDAO,
  subgame: nodeSubGame,
  'SubGame Gamma': nodeSubGame,
  'SubGame Staging': nodeSubGame,
  'Subsocial Node': nodeSubsocial,
  'Subsocial PC': nodeSubsocial,
  'subsocial-node': nodeSubsocial,
  'substrate-contracts-node': nodeSubstrateContractsNode,
  'substrate-node': nodeSubstrate,
  'subzero node': nodeZero,
  'Ternoa Node': nodeTernoa,
  'TrustBase Collator': nodeTrustBase,
  'TrustBase Node': nodeTrustBase,
  'uni arts node': nodeUniarts,
  'UniArts Node': nodeUniarts,
  'Unique Node': nodeUnique,
  'Unit Collator': nodeUnitv,
  'Unit Node': nodeUnitv,
  Vln: nodeVln,
  'VLN PC': nodeVln,
  Web3games: nodeWeb3games,
  AlphaNet: nodeAlphaNet,
  Westlake: nodeWestlake,
  'Westmint Collator': nodeStatemine,
  Whala: nodeWhala,
  'Whala Node': nodeWhala,
  WILT: nodeKilt,
  'zcloak node': nodeZCloak,
  'Zeitgeist Collator': nodeZeitgeist,
  'Zeitgeist Node': nodeZeitgeist,
  Zenlink: nodeZenlink,
  'Zenlink Collator': nodeZenlink
}).reduce((logos, [node, logo]) => _objectSpread(_objectSpread({}, logos), {}, {
  [sanitize(node)]: logo
}), {}); // Alphabetical overrides based on the actual specName

export const specLogos = Object.entries({
  shell: nodeShell,
  statemine: nodeStatemine,
  statemint: nodeStatemine,
  westmint: nodeStatemine
}).reduce((logos, [spec, logo]) => _objectSpread(_objectSpread({}, logos), {}, {
  [sanitize(spec)]: logo
}), {}); // Alphabetical overrides when we pass an explicit logo name
// NOTE: Matches with what is defined as "info" in settings/endpoints.ts
// (Generally would be the 'network' key in the known ss58 as per
// https://github.com/axia-js/common/blob/master/packages/networks/src/index.ts)

export const namedLogos = {
  acala: nodeAcala,
  aleph: chainAleph,
  alexander: nodeAXIA,
  altair: chainAltair,
  basilisk: nodeBasilisk,
  beast: nodeBeast,
  bifrost: nodeBifrost,
  bitcountry: nodeBitCountry,
  calamari: nodeCalamari,
  canvas: nodeCanvas,
  centrifuge: nodeCentrifuge,
  chainx: nodeChainx,
  charcoal: nodeCentrifuge,
  clover: nodeClover,
  crab: nodeCrab,
  'crown-sterling': chainCrownSterling,
  crust: nodeCrust,
  'Crust Maxwell': nodeCrustMaxwell,
  darwinia: nodeDarwinia,
  datahighway: nodeDataHighway,
  'dock-mainnet': nodeDockMainnet,
  'dock-testnet': nodeDockTestnet,
  dotmog: nodeDotMog,
  dusty: chainDusty,
  eave: nodeEave,
  edgeware: nodeEdgeware,
  empty: emptyLogo,
  encointer_canary: nodeEncointerNotee,
  encointer_cantillon: nodeEncointerTeeproxy,
  encointer_gesell: nodeEncointerNotee,
  equilibrium: chainEquilibrium,
  fantour: nodeFantour,
  galital: nodeGalital,
  galois: nodeMath,
  gamepower: nodeGamePower,
  geek: nodeGeek,
  genshiro: chainGenshiro,
  halongbay: nodePolkaFoundry,
  hanonycash: nodeHanonycash,
  heiko: chainHeiko,
  idavoll: nodeIdavoll,
  integritee: nodeIntegritee,
  interbtc: nodeInterBTC,
  ipse: nodeIpse,
  jupiter: nodeJupiter,
  karura: chainKarura,
  khala: nodeKhala,
  kilt: nodeKilt,
  kintsugi: chainKintsugi,
  klugdossier: nodeKlug,
  kpron: nodeApron,
  kulupu: nodeKulupu,
  axialunar: chainAXIALunar,
  kylin: nodeKylin,
  laminar: nodeLaminar,
  litentry: nodeLitentry,
  loomNetwork: nodeLoomNetwork,
  manta: nodeManta,
  mars: nodeAres,
  moonbaseAlpha: axtend,
  moonriver: moonriver,
  moonrock: nodeMoonrock,
  moonshadow: moonshadow,
  mybank: mybank,
  nftmart: nodeNFTMart,
  nodle: nodeNodle,
  'oak-testnet': oakTestnet,
  opportunity: nodeOpportunity,
  'origintrail-allychain-testnet': nodeOriginTrail,
  pangolin: nodePangolin,
  pangoro: nodePangoro,
  phala: nodePhala,
  phoenix: nodePhoenix,
  picasso: chainComposable,
  plasm: nodePlasm,
  polkadex: nodePolkadex,
  axia: nodeAXIA,
  polkafoundry: nodePolkaFoundry,
  polkasmith: nodePolkaSmith,
  polymesh: nodePolymesh,
  pontem: nodePontem,
  prism: nodePrism,
  realis: nodeRealis,
  riochain: nodeRiochain,
  robonomics: nodeRobonomics,
  rocky: nodeCrust,
  betanet: chainBetaNet,
  betanetAcala: nodeAcala,
  betanetApron: nodeApron,
  betanetAres: nodeAres,
  betanetBifrost: nodeBifrost,
  betanetBitCountry: nodeBitCountry,
  betanetChainX: nodeChainx,
  betanetClover: nodeClover,
  betanetCrab: nodeCrab,
  betanetCrust: nodeCrust,
  betanetDarwinia: nodeDarwinia,
  betanetDataHighway: nodeDataHighway,
  betanetEave: nodeEave,
  betanetEncointer: nodeEncointerNotee,
  betanetGalital: nodeGalital,
  betanetGenshiro: chainGenshiro,
  betanetHydrate: chainHydrate,
  betanetIdavoll: nodeIdavoll,
  betanetInterBTC: chainInterBTC,
  betanetJupiter: nodeJupiter,
  betanetKilt: nodeKilt,
  betanetKonomi: nodeKonomi,
  betanetKylin: nodeKylin,
  betanetLaminar: nodeLaminar,
  betanetLitentry: nodeLitentry,
  betanetLoomNetwork: nodeLoomNetwork,
  betanetManta: nodeManta,
  betanetMathChain: nodeMath,
  betanetMoonrock: nodeMoonrock,
  betanetOriginTrail: nodeOriginTrail,
  betanetParami: nodeParami,
  betanetPhala: nodePhala,
  betanetPhoenix: nodePhoenix,
  betanetPlasm: nodePlasm,
  betanetPolkaFoundry: nodePolkaFoundry,
  betanetPrism: nodePrism,
  betanetSingLavender: nodeSingLavender,
  betanetStandard: chainStandard,
  betanetStatemint: nodeStatemine,
  betanetSubDAO: nodeSubDAO,
  betanetSubsocial: nodeSubsocial,
  betanetTick: chainBetaNetTick,
  betanetTrack: chainBetaNetTrack,
  betanetTrick: chainBetaNetTrick,
  betanetTrustBase: nodeTrustBase,
  betanetUnitv: nodeUnitv,
  betanetVln: nodeVln,
  betanetZeitgeist: nodeZeitgeist,
  betanetZenlink: nodeZenlink,
  sakura: nodeSakura,
  shadow: nodeShadow,
  shell: nodeShell,
  sherpax: nodeChainx,
  shibuya: chainShiden,
  shiden: chainShiden,
  singLavender: nodeSingLavender,
  snakenet: chainSnakenet,
  'sora-substrate': nodeSora,
  spanner: chainSpanner,
  'spartan-testnet': nodeSubspace,
  stafi: nodeStafi,
  statemine: nodeStatemine,
  statemint: nodeStatemine,
  subgame: nodeSubGame,
  'SubGame Gamma': nodeSubGame,
  'SubGame Staging': nodeSubGame,
  subsocial: nodeSubsocial,
  substrate: nodeSubstrate,
  substrateContractsNode: nodeSubstrateContractsNode,
  'ternoa-chaos': nodeTernoa,
  trustbase: nodeTrustBase,
  uniarts: nodeUniarts,
  unique: nodeUnique,
  unitv: nodeUnitv,
  unorthodox: chainUnorthodox,
  vln: nodeVln,
  web3games: nodeWeb3games,
  alphanet: nodeAlphaNet,
  alphanetStandard: chainStandard,
  westlake: nodeWestlake,
  westmint: nodeStatemine,
  whala: nodeWhala,
  zCloak: nodeZCloak,
  zeitgeist: nodeZeitgeist,
  zero: nodeZero
}; // extension logos

export const extensionLogos = {
  'axia-js': extensionAXIAJs
}; // external logos, i.e. for explorers

export const externalLogos = {
  commonwealth: externalCommonwealth,
  dotreasury: externalDotreasury,
  dotscanner: externalDotScanner,
  polkascan: externalPolkascan,
  polkassembly: externalPolkassembly,
  polkastats: externalPolkastats,
  statescan: externalStatescan,
  subid: externalSubId,
  subscan: externalSubscan
}; // empty logos

export const emptyLogos = {
  empty: emptyLogo
}; // preload all

[chainLogos, extensionLogos, externalLogos, namedLogos, nodeLogos, emptyLogos].forEach(imageSet => {
  Object.values(imageSet).forEach(src => {
    new Image().src = src;
  });
});