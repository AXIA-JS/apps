// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { LinkOption } from './types';

import { createBetaNet } from './testingRelayBetaNet';
import { createAlphaNet } from './testingRelayAlphaNet';
import { expandEndpoints } from './util';

export function createBetaNetRelay (t: TFunction, firstOnly: boolean, withSort: boolean): LinkOption[] {
  return expandEndpoints(t, [createBetaNet(t)], firstOnly, withSort);
}

export function createAlphaNetRelay (t: TFunction, firstOnly: boolean, withSort: boolean): LinkOption[] {
  return expandEndpoints(t, [createAlphaNet(t)], firstOnly, withSort);
}
