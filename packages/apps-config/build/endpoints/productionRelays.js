// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { createAXIALunar } from "./productionRelayAXIALunar.js";
import { createAXIA } from "./productionRelayAXIA.js";
import { expandEndpoints } from "./util.js";
export function createAXIALunarRelay(t, firstOnly, withSort) {
  return expandEndpoints(t, [createAXIALunar(t)], firstOnly, withSort);
}
export function createAXIARelay(t, firstOnly, withSort) {
  return expandEndpoints(t, [createAXIA(t)], firstOnly, withSort);
}