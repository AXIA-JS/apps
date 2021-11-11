// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { createBetaNet } from "./testingRelayBetaNet.js";
import { createAlphaNet } from "./testingRelayAlphaNet.js";
import { expandEndpoints } from "./util.js";
export function createBetaNetRelay(t, firstOnly, withSort) {
  return expandEndpoints(t, [createBetaNet(t)], firstOnly, withSort);
}
export function createAlphaNetRelay(t, firstOnly, withSort) {
  return expandEndpoints(t, [createAlphaNet(t)], firstOnly, withSort);
}