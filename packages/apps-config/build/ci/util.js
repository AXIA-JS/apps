// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
import fs from 'fs';
import { ApiPromise, WsProvider } from '@axia-js/api';
import { assert, isError, isString } from '@axia-js/util';
import { fetch } from '@axia-js/x-fetch';
import { typesBundle, typesChain } from "../api/index.js";
import { createWsEndpoints } from "../endpoints/index.js";
const TICK = '`';
export function checkEndpoints(issueFile, failures) {
  createWsEndpoints((k, v) => v || k).filter(({
    isDisabled,
    isUnreachable,
    value
  }) => !isDisabled && !isUnreachable && value && isString(value) && !value.includes('127.0.0.1') && !value.startsWith('light://')).map(({
    text,
    value
  }) => ({
    name: text,
    ws: value
  })).filter(v => !!v.ws).forEach(({
    name,
    ws
  }) => it(`${name} @ ${ws}`, async () => {
    const [,, hostWithPort] = ws.split('/');
    const [host] = hostWithPort.split(':');
    const response = await fetch(`https://dns.google/resolve?name=${host}`);
    const json = await response.json();
    let provider = null;
    let api = null;
    let timerId = null;

    try {
      assert(json.Answer, `No DNS entry for ${host}`);
      provider = new WsProvider(ws, false);
      api = new ApiPromise({
        provider,
        throwOnConnect: true,
        throwOnUnknown: true,
        typesBundle,
        typesChain
      });
      setTimeout(() => {
        provider && provider.connect().catch(() => undefined);
      }, 1000);
      await Promise.race([// eslint-disable-next-line promise/param-names
      new Promise((_, reject) => {
        timerId = setTimeout(() => {
          timerId = null;
          reject(new Error(`Timeout connecting to ${ws}`));
        }, 60000);
      }), api.isReadyOrError]);
    } catch (error) {
      if (isError(error) && failures.some(f => error.message.includes(f))) {
        process.env.CI_LOG && fs.appendFileSync(issueFile, `\n${TICK}${name} @ ${ws} ${error.message}${TICK}\n`);
        throw error;
      }
    } finally {
      if (timerId) {
        clearTimeout(timerId);
      }

      if (provider) {
        try {
          if (api) {
            await api.disconnect();
          } else {
            await provider.disconnect();
          }
        } catch {// ignore
        }
      }
    }
  }));
}