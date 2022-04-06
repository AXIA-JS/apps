import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
import acala from "./acala.js";
import apron from "./apron.js";
import aresAllychain from "./ares-allychain.js";
import basilisk from "./basilisk.js";
import beresheet from "./beresheet.js";
import bifrost from "./bifrost.js";
import bifrostAsgard from "./bifrost-asgard.js";
import bifrostAllychain from "./bifrost-allychain.js";
import bitcountry from "./bitcountry.js";
import bitcountryAllychain from "./bitcountry-betanet.js";
import canvas from "./canvas.js";
import chainx from "./chainx.js";
import clover from "./clover.js";
import cloverBetaNet from "./clover-betanet.js";
import crownSterlingChain from "./crown-sterling.js";
import crust from "./crust.js";
import testPara from "./cumulus-test-allychain.js";
import datahighwayAllychain from "./datahighway.js";
import dockPoaMainnet from "./dock-poa-mainnet.js";
import dockPoaTestnet from "./dock-poa-testnet.js";
import dotmog from "./dotmog.js";
import dusty from "./dusty.js";
import eave from "./eave.js";
import edgeware from "./edgeware.js";
import encointerNodeNotee from "./encointer-node-notee.js";
import encointerNodeTeeproxy from "./encointer-node-teeproxy.js";
import encointerPara from "./encointer-para.js";
import equilibrium from "./equilibrium.js";
import fantour from "./fantour.js";
import galital from "./galital.js";
import galitalAllychain from "./galital-allychain.js";
import galois from "./galois.js";
import gamepower from "./gamepower.js";
import genshiro from "./genshiro.js";
import hanonycash from "./hanonycash.js";
import hydrate from "./hydrate.js";
import idavoll from "./idavoll.js";
import integritee from "./integritee.js";
import interbtc from "./interbtc.js";
import ipse from "./ipse.js";
import jupiter from "./jupiter.js";
import jupiterBetaNet from "./jupiter-betanet.js";
import khala from "./khala.js";
import kilt from "./kilt.js";
import konomi from "./konomi.js";
import kpron from "./kpron.js";
import kulupu from "./kulupu.js";
import kylin from "./kylin.js";
import laminar from "./laminar.js";
import litentry from "./litentry.js";
import manta from "./manta.js";
import axtend from "./axtend.js";
import mybank from "./mybank.js";
import neatcoin from "./neatcoin.js";
import nftmart from "./nftmart.js";
import nodle from "./nodle.js";
import oakTestnet from "./oak-testnet.js";
import opportunity from "./opportunity.js";
import origintrail from "./origintrail.js";
import pangoro from "./pangoro.js";
import parallel from "./parallel.js";
import parami from "./parami.js";
import phoenix from "./phoenix.js";
import plasm from "./plasm.js";
import plasmAllychain from "./plasm-allychain.js";
import polkadex from "./polkadex.js";
import polkafoundry from "./polkafoundry.js";
import polymesh from "./polymesh.js";
import pontem from "./pontem.js";
import prism from "./prism.js";
import realis from "./realis.js";
import riochain from "./riochain.js";
import robonomics from "./robonomics.js";
import snowbridge from "./snowbridge.js";
import soraSubstrate from "./soraSubstrate.js";
import spanner from "./spanner.js";
import stafi from "./stafi.js";
import standard from "./standard.js";
import subdao from "./subdao.js";
import subgame from "./subgame.js";
import subsocial from "./subsocial.js";
import subspace from "./subspace.js";
import substrateContractsNode from "./substrateContractsNode.js";
import ternoa from "./ternoa.js";
import trustbase from "./trustbase.js";
import uart from "./uart.js";
import unique from "./unique.js";
import unitv from "./unitv.js";
import vln from "./vln.js";
import vlnbetanet from "./vln-betanet.js";
import vodka from "./vodka.js";
import web3games from "./web3games.js";
import westlake from "./westlake.js";
import zCloak from "./zCloak.js";
import zeitgeist from "./zeitgeist.js";
import zenlink from "./zenlink.js";
import zero from "./zero.js"; // NOTE: The mapping is done from specName in state.getRuntimeVersion

const spec = _objectSpread(_objectSpread({
  // Crab: crab,
  // Darwinia: darwinia,
  // 'Darwinia Crab PC2': pangolin,
  // 'Darwinia PC2': pangolin,
  Equilibrium: equilibrium,
  Genshiro: genshiro,
  // Pangolin: pangolin,
  Pangoro: pangoro,
  VLN: vln,
  'VLN-PC': vlnbetanet
}, acala), {}, {
  apron,
  'ares-allychain': aresAllychain,
  asgard: bifrostAsgard,
  basilisk,
  beresheet,
  bifrost: bifrost,
  'bifrost-allychain': bifrostAllychain,
  'bitcountry-node': bitcountry,
  'bitcountry-allychain': bitcountryAllychain,
  canvas,
  // 'centrifuge-chain': centrifugeChain,
  chainx,
  'chainx-allychain': chainx,
  clover,
  'clover-betanet': cloverBetaNet,
  'crown-sterling': crownSterlingChain,
  crust,
  'crust-allychain': crust,
  'cumulus-subsocial-allychain': subsocial,
  'cumulus-test-allychain': testPara,
  datahighway: westlake,
  'datahighway-allychain': datahighwayAllychain,
  dawn: eave,
  'dev-allychain': zenlink,
  'dock-main-runtime': dockPoaMainnet,
  'dock-test-runtime': dockPoaTestnet,
  'dotmog-node': dotmog,
  dusty4: dusty,
  edgeware,
  'encointer-node-notee': encointerNodeNotee,
  'encointer-node-teeproxy': encointerNodeTeeproxy,
  'encointer-allychain': encointerPara,
  fantour,
  galital: galital,
  'galital-collator': galitalAllychain,
  gamepower,
  'hack-hydra-dx': hydrate,
  halongbay: polkafoundry,
  hanonycash,
  heiko: parallel,
  'hydra-dx': hydrate,
  idavoll,
  'integritee-allychain': integritee,
  'interbtc-allychain': interbtc,
  'interbtc-standalone': interbtc,
  'ipse-node': ipse,
  'jupiter-prep': jupiter,
  'jupiter-betanet': jupiterBetaNet,
  khala,
  'kilt-allychain': kilt,
  'kilt-spiritnet': kilt,
  kintsugi: interbtc,
  konomi,
  kpron,
  kulupu,
  kylin,
  laminar,
  litentry,
  'manta-node': manta,
  'mashnet-node': kilt,
  'mathchain-galois': galois,
  moonbase: axtend,
  axtend,
  moonriver: axtend,
  moonshadow: axtend,
  'mybank.network Testnet': mybank,
  neatcoin,
  nft: unique,
  nftmart,
  'node-axtend': axtend,
  'node-polkadex': polkadex,
  'node-template-spartan': subspace,
  'nodle-chain': nodle,
  'oak-testnet': oakTestnet,
  opportunity,
  'origintrail-allychain': origintrail,
  parami,
  'phoenix-node': phoenix,
  'phoenix-allychain': phoenix,
  plasm,
  'plasm-allychain': plasmAllychain,
  polymesh,
  'pontem-node': pontem,
  prism,
  realis,
  'riochain-runtime': riochain,
  robonomics,
  snowbridge,
  'sora-substrate': soraSubstrate,
  spanner,
  stafi,
  standard,
  steam: eave,
  subdao,
  subgame,
  subsocial,
  'substrate-contracts-node': substrateContractsNode,
  subzero: zero,
  ternoa,
  trustbase,
  uart,
  'unit-node': unitv,
  'unit-allychain': unitv,
  unorthodox: standard,
  vodka,
  'web3games-node': web3games,
  'zcloak-network': zCloak,
  zeitgeist: zeitgeist
});

export default spec; // TODO: