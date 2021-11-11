// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import languageCache from "./cache.js";
const loaders = {};
export default class Backend {
  constructor() {
    this.type = 'backend';
  }

  async read(lng, _namespace, responder) {
    if (languageCache[lng]) {
      return responder(null, languageCache[lng]);
    } // eslint-disable-next-line @typescript-eslint/no-misused-promises


    if (!loaders[lng]) {
      loaders[lng] = this.createLoader(lng);
    }

    const [error, data] = await loaders[lng];
    return responder(error, data);
  }

  async createLoader(lng) {
    try {
      const response = await fetch(`locales/${lng}/translation.json`, {});

      if (!response.ok) {
        return [`i18n: failed loading ${lng}`, response.status >= 500 && response.status < 600];
      } else {
        languageCache[lng] = await response.json();
        return [null, languageCache[lng]];
      }
    } catch (error) {
      return [error.message, false];
    }
  }

}
Backend.type = 'backend';