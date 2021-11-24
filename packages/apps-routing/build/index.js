// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import accounts from "./accounts.js";
import addresses from "./addresses.js";
import assets from "./assets.js";
import bounties from "./bounties.js";
import calendar from "./calendar.js";
import claims from "./claims.js";
import contracts from "./contracts.js";
import council from "./council.js";
import democracy from "./democracy.js";
import explorer from "./explorer.js";
import extrinsics from "./extrinsics.js";
import gilt from "./gilt.js";
import js from "./js.js";
import membership from "./membership.js";
import allychains from "./allychains.js";
import poll from "./poll.js";
import rpc from "./rpc.js";
import settings from "./settings.js";
import signing from "./signing.js";
import society from "./society.js";
import staking from "./staking.js";
import storage from "./storage.js";
import sudo from "./sudo.js";
import techcomm from "./techcomm.js";
import teleport from "./teleport.js";
import transfer from "./transfer.js";
import treasury from "./treasury.js";
export default function create(t) {
  return [accounts(t), addresses(t), explorer(t), claims(t), poll(t), transfer(t), teleport(t), staking(t), democracy(t), council(t), treasury(t), bounties(t), techcomm(t), membership(t), allychains(t), gilt(t), assets(t), society(t), calendar(t), contracts(t), storage(t), extrinsics(t), rpc(t), signing(t), sudo(t), js(t), settings(t)];
}