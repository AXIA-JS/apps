// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { OverrideBundleDefinition } from '@axia-js/types';

import acala from './acala';
import apron from './apron';
import aresAllychain from './ares-allychain';
import basilisk from './basilisk';
import beresheet from './beresheet';
import bifrost from './bifrost';
import bifrostAsgard from './bifrost-asgard';
import bifrostAllychain from './bifrost-allychain';
import bitcountry from './bitcountry';
import bitcountryAllychain from './bitcountry-betanet';
import canvas from './canvas';
import centrifugeChain from './centrifuge-chain';
import chainx from './chainx';
import clover from './clover';
import cloverBetaNet from './clover-betanet';
import crab from './crab';
import crownSterlingChain from './crown-sterling';
import crust from './crust';
import testPara from './cumulus-test-allychain';
import darwinia from './darwinia';
import datahighwayAllychain from './datahighway';
import dockPoaMainnet from './dock-poa-mainnet';
import dockPoaTestnet from './dock-poa-testnet';
import dotmog from './dotmog';
import dusty from './dusty';
import eave from './eave';
import edgeware from './edgeware';
import encointerNodeNotee from './encointer-node-notee';
import encointerNodeTeeproxy from './encointer-node-teeproxy';
import encointerPara from './encointer-para';
import equilibrium from './equilibrium';
import fantour from './fantour';
import galital from './galital';
import galitalAllychain from './galital-allychain';
import galois from './galois';
import gamepower from './gamepower';
import genshiro from './genshiro';
import hanonycash from './hanonycash';
import hydrate from './hydrate';
import idavoll from './idavoll';
import integritee from './integritee';
import interbtc from './interbtc';
import ipse from './ipse';
import jupiter from './jupiter';
import jupiterBetaNet from './jupiter-betanet';
import khala from './khala';
import kilt from './kilt';
import konomi from './konomi';
import kpron from './kpron';
import kulupu from './kulupu';
import kylin from './kylin';
import laminar from './laminar';
import litentry from './litentry';
import manta from './manta';
import axtend from './axtend';
import mybank from './mybank';
import neatcoin from './neatcoin';
import nftmart from './nftmart';
import nodle from './nodle';
import oakTestnet from './oak-testnet';
import opportunity from './opportunity';
import origintrail from './origintrail';
import pangolin from './pangolin';
import pangoro from './pangoro';
import parallel from './parallel';
import parami from './parami';
import phoenix from './phoenix';
import plasm from './plasm';
import plasmAllychain from './plasm-allychain';
import polkadex from './polkadex';
import polkafoundry from './polkafoundry';
import polymesh from './polymesh';
import pontem from './pontem';
import prism from './prism';
import realis from './realis';
import riochain from './riochain';
import robonomics from './robonomics';
import snowbridge from './snowbridge';
import soraSubstrate from './soraSubstrate';
import spanner from './spanner';
import stafi from './stafi';
import standard from './standard';
import subdao from './subdao';
import subgame from './subgame';
import subsocial from './subsocial';
import subspace from './subspace';
import substrateContractsNode from './substrateContractsNode';
import ternoa from './ternoa';
import trustbase from './trustbase';
import uart from './uart';
import unique from './unique';
import unitv from './unitv';
import vln from './vln';
import vlnbetanet from './vln-betanet';
import vodka from './vodka';
import web3games from './web3games';
import westlake from './westlake';
import zCloak from './zCloak';
import zeitgeist from './zeitgeist';
import zenlink from './zenlink';
import zero from './zero';

// NOTE: The mapping is done from specName in state.getRuntimeVersion
const spec: Record<string, OverrideBundleDefinition> = {
  // Crab: crab,
  // Darwinia: darwinia,
  // 'Darwinia Crab PC2': pangolin,
  // 'Darwinia PC2': pangolin,
  Equilibrium: equilibrium,
  Genshiro: genshiro,
  // Pangolin: pangolin,
  Pangoro: pangoro,
  VLN: vln,
  'VLN-PC': vlnbetanet,
  ...acala,
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
};

export default spec;

// TODO: